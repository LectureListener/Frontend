const ArrayUtils = require("../utils/ArrayUtils")

class HighlightConverter {
    constructor(messageConverter) {
        this.messageConverter = messageConverter
    }

    convert(selection) {
        if (selection.type !== "Range")
            return

        for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i)
                
            const ancestor = range.commonAncestorContainer
            const startNode = range.startContainer
            const endNode = range.endContainer

            const startElement = startNode.parentElement
            const endElement = endNode.parentElement   

            // if the end node is part of the space at the end, we have to specially assign it an offset
            let endOffset = -1
            if (endNode.data !== endNode.data.trim())
                endOffset = endElement.text.length
            else  
                endOffset = range.endOffset

            // do same for beginning 
            let startOffset = -1
            if (startNode.data !== startNode.data.trim())
                startOffset = startElement.text.length - 1
            else
                startOffset = range.startOffset

            const transcriptContainer = document.getElementsByClassName("transcription")[0]
            // if there is highlighting out of the transcription
            if (!transcriptContainer.contains(ancestor))
                return

            // get row of end and start nodes
            let startRowContainer = startElement
            while (!startRowContainer.classList.contains("section"))
                startRowContainer = startRowContainer.parentElement

            let endRowContainer = endElement
            while (!endRowContainer.classList.contains("section"))
                endRowContainer = endRowContainer.parentElement
            
            // if all the highlighting is neatly through the same section, then we can just loop using the offsets
            if (endRowContainer.isSameNode(startRowContainer)) {
                // if theyre the same then it's special
                if (startElement.isSameNode(endElement)) {
                    ArrayUtils.pushRangeNoOverlap(this.messageConverter.messagesById[startElement.id].highlights, [ startOffset, endOffset ])
                    return
                }

                // do start one becuase it is special
                ArrayUtils.pushRangeNoOverlap(this.messageConverter.messagesById[startElement.id].highlights, [ startOffset, startElement.text.length ])

                let currentElement = startElement.nextSibling
                while (!currentElement.isSameNode(endElement)) {
                    this.messageConverter.messagesById[currentElement.id].highlights = [ [ 0, currentElement.text.length ] ]

                    currentElement = currentElement.nextSibling
                }

                // do last becuase it's also special
                ArrayUtils.pushRangeNoOverlap(this.messageConverter.messagesById[endElement.id].highlights, [ 0, endOffset ])
                return
            }



            // update the message of the start node first
            ArrayUtils.pushRangeNoOverlap(this.messageConverter.messagesById[startElement.id].highlights, [ startOffset, startElement.text.length ])

            // loop through sibllings till at next row
            let currentElement = startElement.nextSibling
            while (currentElement) {
                this.messageConverter.messagesById[currentElement.id].highlights = [ [ 0, currentElement.text.length ] ]

                currentElement = currentElement.nextSibling
            }

            // loop through all the rows between start and end and grab the necessary data
            let currentRowContainer = startRowContainer.nextSibling
            while (!currentRowContainer.isSameNode(endRowContainer)) {
                const phrases = currentRowContainer.getElementsByClassName("transcript-phrase")
                for (let i = 0; i < phrases.length; i++) {
                    this.messageConverter.messagesById[phrases[i].id].highlights = [ [ 0, phrases[i].length ] ]
                }

                currentRowContainer = currentRowContainer.nextSibling
            }
                
            // do last element
            ArrayUtils.pushRangeNoOverlap(this.messageConverter.messagesById[endElement.id].highlights, [0, endOffset])

            // do last row // go backwards so a getElementsByClassName call isn't needed
            currentElement = endElement.previousSibling
            while (currentElement) {
                this.messageConverter.messagesById[currentElement.id].highlights = [ [ 0, currentElement.text.length ] ]

                currentElement = currentElement.previousSibling
            }
        }
    }
}

module.exports = HighlightConverter