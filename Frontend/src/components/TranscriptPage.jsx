import AppHeader from './AppHeader'
import InputPage from './InputPage';
import TranscriptSection from './templates/TranscriptSection';
import TopicsSection from './templates/TopicsSection';
import Toolbar from './templates/Toolbar';
import Buffer from './Buffer';
import LoadId from './templates/LoadId';
import Error from './templates/Error';
import { useState, useEffect } from 'react';
import logic from '../logic';
import sdk from '../sdk'

const client = new sdk.Client()
const conversationConverter = new logic.ConversationConverter()
const highlightConverter =  new logic.HighlightConverter(conversationConverter.messageConverter)

const TranscriptPage = (props) => {
    const onFileUpload = async (file) => {
        let conversation = null

        setCurrentPage("load")

        if (client.auth.accessToken === "") {
            await client.init({
                appId: "554d7a6d71387749336f69344c327671734d62553169663231635245394c3849",
                // i swear i know what secret means my finger just slipped
                appSecret: "666e76544141647162717a76733267765536767333725545424967434b6e47663767466a3642676467764545537a386c5446584b4f58553778694263592d5546"
            })
        }

        if (file.type.startsWith("audio"))
            conversation = await client.api.createConversationFromAudio(file, file.size)
        else
            conversation = await client.api.createConversationFromVideo(file, file.size)
        await conversation.jobs[0].waitForFinish()

        await conversationConverter.convert(conversation)
        setCurrentTranscript(conversationConverter.messageConverter.messages)
        setCurrentTopicsAndQuestions(conversationConverter.topicAndQuestionConverter.topicsAndQuestions)
        
        setFile(file)
    }

    const setFile = (file) => {
        setCurrentPage("transcript")
        toggleFullTranscript(true)
           
        const audio = document.getElementById("audioPlayer")
        audio.src = URL.createObjectURL(file)
    }

    const backendUrl = "http://34.125.111.83:5000/"
    const onLoad = async () => { 
        setCurrentPage("buffer")       
        const page = 0 // get page number somehow
        const res = await fetch(backendUrl + "transcription/" + page) 
        const json = await res.json()

        console.log(json.transcription)
        setCurrentTopicsAndQuestions(json.transcription.topicsAndQuestions)
        setCurrentTranscript(json.transcription.transcript)
    }

    const onSave = async () => {
        setCurrentPage('error');

        if (currentTranscript === 0)
            return

        const options = {
            method: "POST",
            body: JSON.stringify({
                transcription: JSON.stringify({
                    transcript: currentTranscript,
                    topicsAndQuestions: currentTopicsAndQuestions,
                })
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }
        const res = await fetch(backendUrl + "transcription", options)
        const { page } = await res.json()
        console.log(page)
    }

    const [currentTopicsAndQuestions, setCurrentTopicsAndQuestions] = useState([])

    const [currentTranscript, setCurrentTranscript] = useState([])

    const [currentPage, setCurrentPage] = useState("transcript");
  
    const [currentTimestamp, setTimestamp] = useState(0);
    
    const [fullTranscript, toggleFullTranscript] = useState(true);

    const [highlightToggle, toggleHighlight] = useState(false)

    const skipAudio = (timestamp) => {
        setTimestamp(parseInt(timestamp.split(':')[0] * 60) + parseInt(timestamp.split(':')[1]));
    }

    useEffect(() => {
        const audioPlayer = document.getElementById("audioPlayer")
        audioPlayer.currentTime = currentTimestamp;
        audioPlayer.play()
    }, [currentTimestamp]);

    useEffect(() => {

    }, [fullTranscript])

    useEffect(() => {
        let appStylesheet = null
        for (let i = 0; i < document.styleSheets.length; i++) {
            const sheet = document.styleSheets.item(i)
            if (sheet.cssRules.length > 0 && sheet.cssRules.item(0).cssText.startsWith("#identifier")) {
                appStylesheet = sheet
                break                
            }
        }

        const button = document.getElementById("highlightButton")
        if (highlightToggle) {
            button.style.backgroundColor = "rgb(167, 58, 63)"
            // disable dragging, and turn a tags into regular text
            appStylesheet.insertRule("a { pointer-events: none; cursor: default; user-drag: none; -webkit-user-drag: none; }", 1)
        } else {
            button.style.backgroundColor = "darkgrey"
            appStylesheet.deleteRule(1)
        }
    }, [highlightToggle])

    useEffect(() => {
        window.addEventListener("beforeunload", (event) => {
            const confirmationMessage = 'It looks like you have been editing something. '
            + 'If you leave before saving, your changes will be lost.';

            (event || window.event).returnValue = confirmationMessage;
            return confirmationMessage; 
        }) 

        const parseHighlight = () => {
            const changedMessages = highlightConverter.convert(window.getSelection())
            if (changedMessages == null)
                return
            
            window.getSelection().removeAllRanges()
            changedMessages.forEach((element) => {
                console.log(element)
                const highlights = highlightConverter.messageConverter.messagesById[element.id].highlights
                let text = element.textContent
                for (let i = 0; i < highlights.length; i++) {
                    const range = highlights[i]
                    // add length of mark tags
                    console.log(range)
                    text = text.substring(0, range[0]) + "<mark>" + text.substring(range[0], range[1]) + "</mark>" + text.substring(range[1]);
                }
                element.innerHTML = text
            })
        }

        document.onmouseup = parseHighlight
        document.onkeyup = parseHighlight
    })

    return (
        <div className="container-fluid vw-100 vh-100">
            <AppHeader currentPage={currentPage} changePage={setCurrentPage} onSave={onSave} onLoad={onLoad}></AppHeader>
            <div className="interface d-flex flex-column">
                <div className="playbar h-25 py-4">
                    {(() => {
                        switch (currentPage) {
                            case 'transcript': return <audio id="audioPlayer" className="d-block mx-auto w-75" controls></audio>
                            case 'input': return <InputPage onFileUpload={onFileUpload}/>
                            case 'load' : return <LoadId onLoad={onLoad}/>
                            case 'error': return <Error onClose={setCurrentPage}/>
                            case 'buffer' : return <Buffer/>
                        }
                    }) ()
                    }
                </div>
                <div className="info w-100 d-flex justify-content-between align-items-start">
                    <div className="caption-info w-75 d-flex flex-column">
                        <Toolbar highlightToggle={highlightToggle} toggleHighlight={toggleHighlight} isFullTranscript={fullTranscript} currentPage={currentPage} toggleTranscript={() => currentPage === 'transcript' ? toggleFullTranscript(!fullTranscript) : null}></Toolbar>
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
                        { currentTopicsAndQuestions.map((section) => (
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
