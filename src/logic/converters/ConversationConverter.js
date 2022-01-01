const MessageConverter = require("./MessageConverter")
const TopicAndQuestionConverter = require("./TopicAndQuestionConverter")

class ConversationConverter {
    constructor() {
        this.messageConverter = new MessageConverter()
        this.topicConverter = new TopicAndQuestionConverter()
    }

    async convert(conversation) {
        const messages = await conversation.fetchSpeechToText({ verbose: false })
        const topics = await conversation.fetchTopics({ parentRefs: false })
        const questions = await conversation.fetchQuestions()

        if (!messages)
            return
        this.messageConverter.convert(messages.messages)

        if (!topics || !questions)
            return 
        this.topicConverter.convert(topics.topics, questions.questions, messages.messages)
    }
}

module.exports = ConversationConverter