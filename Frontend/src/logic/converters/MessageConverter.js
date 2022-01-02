const DateFormatter = require("../utils/DateFormatter")

const maxMessageLength = 10

class MessageConverter {
    constructor() {
        // convert from the api's messages to something our website can use
        this.messages = []
    }

    convert(messages) {
        if (!messages)
            return

        const clipStartTime = new Date(messages[0].startTime)

        let currentMessageLength = 0
        let currentMessage = { message: [] }
        messages.forEach(apiMessage => {
            const messageStart = new Date(apiMessage.startTime)
            const messageEnd = new Date(apiMessage.endTime)

            // subtraction produces milliseconds, conver to seconds by dividing by 1000
            const messageLength = (messageEnd - messageStart) / 1000

            currentMessageLength += messageLength

            const currentMessageStart = new Date(messageStart - clipStartTime)
            const currentLineTimestamp = DateFormatter.toMinutesAndHours(currentMessageStart)
    
            if (!currentMessage.timestamp) 
                currentMessage.timestamp = currentLineTimestamp

            const currentLine = {
                text: apiMessage.text,
                timestamp: currentLineTimestamp
            }
            currentMessage.message.push(currentLine)
            
            // if exceed the length, reset everything and go to next message
            if (currentMessageLength > maxMessageLength) {
                this.messages.push(currentMessage)
                currentMessage = { message: [] }
                currentMessageLength = 0
            }
        });
    }
}

module.exports = MessageConverter