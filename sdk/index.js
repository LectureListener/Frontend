// root classes
exports.Client = require("./Client")

// api stuff
exports.Auth = require("./api/Auth")
exports.Api = require("./api/Api")

// structures
exports.AudioConversation = require("./structures/AudioConversation")
exports.BaseConversation = require("./structures/BaseConversation")
exports.VideoConversation = require("./structures/VideoConversation")

// errors
exports.ApiError = require("./errors/ApiError")