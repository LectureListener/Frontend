const maxMessageLength = 10

class MessageConverter {
    constructor(messages) {
        // convert from the api's messages to something our website can use
        this.messages = []

        if (!messages)
            return

        const clipStartTime = new Date(messages.messages[0].startTime)

        let currentMessageLength = 0
        let currentMessage = { message: [] }
        messages.messages.forEach(apiMessage => {
            const messageStart = new Date(apiMessage.startTime)
            const messageEnd = new Date(apiMessage.endTime)

            // subtraction produces milliseconds, conver to seconds by dividing by 1000
            const messageLength = (messageEnd - messageStart) / 1000

            currentMessageLength += messageLength

            let currentLineTimestamp = ""
            const currentMessageStart = new Date(messageStart - clipStartTime)

            // If it lasts into the hours
            if (currentMessageStart.getUTCHours())
                currentLineTimestamp = `${currentMessageStart.getUTCHours().toString().padStart(2, "0")}:${currentMessageStart.getUTCMinutes().toString().padStart(2, "0")}:${currentMessageStart.getUTCSeconds().toString().padStart(2, "0")}`
            else
                currentLineTimestamp = `${currentMessageStart.getUTCMinutes().toString().padStart(2, "0")}:${currentMessageStart.getUTCSeconds().toString().padStart(2, "0")}`
    
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

        this.messages.forEach(message => {
            console.log(message)
        })
    }
}

module.exports = MessageConverter