const BaseConversation = require("./BaseConversation")

class VideoConversation extends BaseConversation {
    async updateConversation(video, streamLength = 0, params = {}) {
        const { jobId } = await this.client.api.createConversationFromData(video, "process/video/:" + this.conversationId, "process/video/url/:" + this.conversationId, "PUT", streamLength, params)
        this.jobId = jobId
        return this
    }
}

module.exports = VideoConversation