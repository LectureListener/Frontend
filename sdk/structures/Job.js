class Job {
    constructor(jobId, client) {
        this.jobId = jobId
        this.client = client
        this.endpointUrl = `job/${jobId}/`
    }

    async fetchStatus() {
        return await this.client.api.endpoint(this.endpointUrl, "GET")
    }
}

module.exports = Job