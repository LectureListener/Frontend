
class BaseConversation {
    constructor(conversationId, jobId, client) {
        this.conversationId = conversationId
        this.jobId = jobId
        this.client = client
        this.endpointUrl = `conversations/${conversationId}/`
    }
    
    async updateMetadata(newMetadata = {}) {
        return await this.client.api.endpoint(this.endpointUrl, "PUT", newMetadata)
    }

    async updateMembers(updatedMember = {}) {
        return await this.client.api.endpoint(this.endpointUrl + "members", updatedMember)
    }

    async fetchTranscript(params = {}) {
        if (!params.contentType)
            params.contentType = "text/markdown"

        return await this.client.api.endpoint(this.endpointUrl + "transcript", "POST", JSON.stringify(params))
    }

    async fetchConversationData() {
        return await this.client.api.endpoint(this.endpointUrl, "GET")
    }

    async fetchJobStatus() {
        return await this.client.api.endpoint("job/" + this.jobId, "GET")
    }

    async fetchSpeechToText(params = { verbose: true }) {
        return await this.client.api.endpoint(this.endpointUrl + "messages", "GET", null, params)
    }
    
    async fetchSpeechToText(params = { parentRefs: true }) {
        return await this.client.api.endpoint(this.endpointUrl + "topics", "GET", null, params)
    }

    async fetchQuestions() {
        return await this.client.api.endpoint(this.endpointUrl + "questions", "GET")
    }

    async fetchEntities() {
        return await this.client.api.endpoint(this.endpointUrl + "entities", "GET")
    }

    async fetchMembers() {
        return await this.client.api.endpoint(this.endpointUrl + "members", "GET")
    }
}

module.exports = BaseConversation