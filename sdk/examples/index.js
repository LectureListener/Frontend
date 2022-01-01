// this is honestly a really terrible example method but it works

const { Client } = require("../index")
const fs = require("fs")

const what = async () => {
    const clientOptions = {
        "appId": "APP ID",
        "appSecret": "APP SECRET"
    }
    const client = new Client()
    await client.init(clientOptions)
    
    const stats = fs.statSync("test audio.mp3")
    let stream = fs.createReadStream("test audio.mp3")
    const conversation = await client.api.createConversationFromAudio(stream, stats.size)
    console.log(conversation.conversationId)

    
    function wait() {
        setTimeout(async () => {
            const { status } = await conversation.fetchJobStatus()
            if (status != "completed")
                wait()
            else
                console.log(await conversation.fetchSpeechToText())
        }, 1000);
    }
    await wait()
}

what()
