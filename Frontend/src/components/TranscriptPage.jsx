import AppHeader from './AppHeader'
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputPage from './InputPage';
import TranscriptSection from './templates/TranscriptSection';
import TopicsSection from './templates/TopicsSection';
import Toolbar from './templates/Toolbar';
import Buffer from './Buffer';
import { useState, useEffect } from 'react';

const TranscriptPage = (props) => {

    const exampleObject =  [{
            "timestamp": "1:30",
            "message": [
            {
                "text": "blah blah blah",
                "timestamp": "1:50",
                "id": 123098350498234
            },
            {
                "text": "blah blah blah",
                "timestamp": "2:10",
                "id": 123098350498234
            },
            {
                "text": "blah blah blah",
                "timestamp": "2:30",
                "id": 123098350498234
            },
            {
                "text": "blah blah blah",
                "timestamp": "2:50",
                "id": 123098350498234
            }
        ]
    }];

    const exampleTopics = [
        { 
          "type": "topic",
          "timestamp": "0:45",
          "text": "something or other"
        },
        {
          "type": "question",
          "timestamp": "2:30",
          "text": "what is going on?"
        }
      ];

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
                            case 'input': return <InputPage/>
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
                                 exampleObject.map((section) => (
                                    <TranscriptSection skipAudio={skipAudio} timestamp={section.timestamp} message={section.message}/>
                                ))  
                            : "Highlighted stuff"  
                            : null                    
                            }
                        </div>
                    </div>
                    <div className="topics w-25 mt-0 p-4 overflow-scroll">
                        <h4 className="text-center mb-3">Topics and Questions</h4>
                        { exampleTopics.map((section) => (
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
