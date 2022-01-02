import AppHeader from './AppHeader'
import InputPage from './InputPage';
import TranscriptSection from './templates/TranscriptSection';
import TopicsSection from './templates/TopicsSection';
import Toolbar from './templates/Toolbar';
import Buffer from './Buffer';
import { useState, useEffect } from 'react';
import logic from '../logic';
import sdk from '../sdk'

const TranscriptPage = (props) => {

    const conversationData = {
        client: null,
        conversation: null,
        conversationConverter: new logic.ConversationConverter()
    }

    const onFileUpload = async (file) => {
        if (conversationData.client === null) {
            conversationData.client = new sdk.Client()
            await conversationData.client.init({
                appId: "554d7a6d71387749336f69344c327671734d62553169663231635245394c3849",
                // i swear i know what secret means my finger just slipped
                appSecret: "666e76544141647162717a76733267765536767333725545424967434b6e47663767466a3642676467764545537a386c5446584b4f58553778694263592d5546"
            })
        }

        if (file.type.startsWith("audio"))
            conversationData.conversation = await conversationData.client.api.createConversationFromAudio(file, file.size)
        else
            conversationData.conversation = await conversationData.client.api.createConversationFromVideo(file, file.size)
        await conversationData.conversation.jobs[0].waitForFinish()
        // trigger loading
        conversationData.conversationConverter.convert(conversationData.conversation)
        setCurrentTranscript(conversationData.conversationConverter.messageConverter.messages)
        setCurrentTopicAndQuestions(conversationData.conversationConverter.topicConverter.topicsAndQuestions)
        console.log(conversationData.conversationConverter.messageConverter.messages)
        console.log(conversationData.conversationConverter.topicConverter.topicsAndQuestions)
        setCurrentPage("transcript")
    }

    const [currentTopicAndQuestions, setCurrentTopicAndQuestions] = useState([])

    const [currentTranscript, setCurrentTranscript] = useState([])

    const [currentPage, setCurrentPage] = useState("transcript");
  
    const [currentTimestamp, setTimestamp] = useState(0);
    
    const [fullTranscript, toggleFullTranscript] = useState(true);

    const skipAudio = (timestamp) => {
        setTimestamp(parseInt(timestamp.split(':')[0] * 60) + parseInt(timestamp.split(':')[1]));
    }

    useEffect(() => {
        document.getElementById("audioplayer").currentTime = currentTimestamp;
    }, [currentTimestamp]);

    return (
        <div className="container-fluid vw-100 vh-100">
            <AppHeader currentPage={currentPage} changePage={setCurrentPage}></AppHeader>
            <div className="interface d-flex flex-column ">
                <div className="playbar vw-75 py-4">
                    {(() => {
                        switch (currentPage) {
                            case 'transcript': return <audio id="audioplayer" className="w-75" src="" currentTime={currentTimestamp} controls autoplay ></audio>
                            case 'input': return <InputPage onFileUpload={onFileUpload}/>
                            case 'load' : return <Buffer/>
                        }
                    }) ()
                    }
                    Current timestamp is {currentTimestamp}
                </div>
                <div className="info w-100 d-flex justify-content-between align-items-start">
                    <div className="caption-info w-75 d-flex flex-column">
                        <Toolbar isFullTranscript={fullTranscript} currentPage={currentPage} toggleTranscript={() => currentPage === 'transcript' ? toggleFullTranscript(!fullTranscript) : null}></Toolbar>
                        <div className="transcription p-4 d-block d-flex flex-column overflow-scroll">
                            { currentPage === 'transcript' ? 
                                fullTranscript ?
                                currentTranscript.map((section) => (
                                    <TranscriptSection skipAudio={skipAudio} timestamp={section.timestamp} message={section.message}/>
                                ))  
                            : "Highlighted stuff"  
                            : null                    
                            }
                        </div>
                    </div>
                    <div className="topics w-25 mt-0 p-4 overflow-scroll">
                        <h4 className="text-center mb-3">Topics and Questions</h4>
                        { currentTopicAndQuestions.map((section) => (
                            <TopicsSection skipAudio={skipAudio} topic={section}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TranscriptPage
