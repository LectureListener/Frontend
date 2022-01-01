const Api = require("./api/Api")
const Auth = require("./api/Auth")

class Client {
    constructor () {
        this.api = new Api(this)
        this.auth = new Auth(this)
    }

    async init(options = {}) {
        const { appId, appSecret } = options

        await this.auth.init(appId, appSecret)
    }
}

module.exports = Client