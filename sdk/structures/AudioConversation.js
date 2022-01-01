const BaseConversation = require("./BaseConversation")

class AudioConversation extends BaseConversation {
    async updateConversation(audio, streamLength = 0, params = {}) {
        const { jobId } = await this.client.api.createConversationFromData(audio, "process/audio/:" + this.conversationId, "process/audio/url/:" + this.conversationId, "PUT", streamLength, params)
        this.jobId = jobId
        return this
    }
}

module.exports = AudioConversation