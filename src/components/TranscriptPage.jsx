import AppHeader from './AppHeader'
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TranscriptSection from './templates/TranscriptSection';
import TopicsSection from './templates/TopicsSection';
import Buffer from './Buffer';
import { useState, useEffect } from 'react';

const TranscriptPage = (props) => {

    const exampleObject = [
        {
            "timestamp": "0:00",
            "message": [
                {
                    "text": "blah blah blah",
                    "timestamp": "0:15"
                },
                {
                    "text": "blah blah blah",
                    "timestamp": "0:25"
                },
                {
                    "text": "blah blah blahaaa aaaaaa aaaaa aaaaaa aaa aaaaa aaaaa aaas ahh ahhh haa haa haa haaa ",
                    "timestamp": "0:50"
                },
                {
                    "text": "blah blah blah",
                    "timestamp": "1:20"
                }
            ]
        },
        {
            "timestamp": "1:30",
            "message": [
                {
                    "text": "blah blah blah",
                    "timestamp": "1:50"
                },
                {
                    "text": "blah blah blah",
                    "timestamp": "2:10"
                },
                {
                    "text": "blah blah blah",
                    "timestamp": "2:30"
                },
                {
                    "text": "blah blah blah",
                    "timestamp": "2:50"
                }
            ]
        }
    ];

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
    
    const [currentTimestamp, setTimestamp] = useState(0);
    
    const skipAudio = (timestamp) => {
        setTimestamp(parseInt(timestamp.split(':')[0] * 60) + parseInt(timestamp.split(':')[1]));
    }

    useEffect(() => {
        document.getElementById("audioplayer").currentTime = currentTimestamp;
    }, [currentTimestamp]);


    return (
        <div className="container-fluid vw-100 vh-100">
            <AppHeader></AppHeader>
            <div className="interface d-flex flex-column ">
                <div className="playbar vw-75 py-5">
                    <audio id="audioplayer" className="w-75" src="" currentTime={currentTimestamp} controls autoplay >
                    </audio>
                    Current timestamp is {currentTimestamp}
                </div>
                <div className="info w-100 d-flex justify-content-between align-items-start">
                    <div className="caption-info w-75 d-flex flex-column">
                        <div className="toolbar p-4 my-0">
                            toolbar for highlight ansd comments on transcription as well as navigation
                        </div>
                        <div className="transcription p-4 d-block d-flex flex-column overflow-scroll">
                            { exampleObject.map((section) => (
                                <TranscriptSection skipAudio={skipAudio} timestamp={section.timestamp} message={section.message}/>
                            ))}
                        </div>
                    </div>
                    <div className="topics w-25 mt-0 p-4 overflow-scroll">
                        <h2>Topics and Questions</h2>
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
