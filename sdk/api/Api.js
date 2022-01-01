const fetch = require("node-fetch")
const { URL, URLSearchParams } = require("url")
const ApiError = require("../errors/ApiError")
const AudioConversation = require("../structures/AudioConversation")
const VideoConversation = require("../structures/VideoConversation")

const apiURL = "https://api.symbl.ai/"
const apiVersion = "v1/"

class Api {
    constructor(client) {
        this.client = client
    }

    async endpoint(endpoint, method, body, params = {}, headers = {}) {
        if (!this.client.auth.accessToken)
            throw new Error("Auth has not been initialized.")

        if (!headers.Authorization)
            headers.Authorization = `Bearer ${this.client.auth.accessToken}`

        const options = {
            method: method,
            body: body,
            headers: headers
        }

        const url = new URL(apiVersion + endpoint, apiURL)
        url.search = new URLSearchParams(params).toString()
        const res = await fetch(url, options)
            .catch((error) => {
                throw new ApiError("Request failed with error: " + error)
            })

        if (!res.ok) 
            throw new ApiError(`Request failed with error: ${res.status}: ${await res.text()}`)

        return await res.json()
    }

    // TODO: make it easier to add params (maybe)
    async createConversationFromAudio(audio, streamLength = 0, params = {}) {
        const { conversationId, jobId } = await this.createConversationFromData(audio, "process/audio", "process/audio/url", "POST", streamLength, params)
        return new AudioConversation(conversationId, jobId, this.client)
    }

    async createConversationFromVideo(video, streamLength = 0, params = {}) {
        const { conversationId, jobId } = await this.createConversationFromData(video, "process/video", "process/video/url", "POST", streamLength, params)
        return new VideoConversation(conversationId, jobId, this.client)
    }

    async createConversationFromData(data, endpoint, urlEndpoint, method, streamLength = 0, params = {}) {
        // if we're given a string it's probably a url
        let res = null
        if (typeof data === "string") {
            res = await this.endpoint(urlEndpoint, method, data, params, null)
        } else {
            const headers = {
                "Content-Length": streamLength
            }
    
            res = await this.endpoint(endpoint, method, data, params, headers)
        }
        return res
    }

    async fetchConversations(params = {}) {
        return await this.endpoint("conversations", "GET", null, params)
    }
}

module.exports = Api