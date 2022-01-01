import AppHeader from './AppHeader'
import { Link } from "react-router-dom";

const TranscriptPage = () => {
    return (
        <div className="container-fluid vw-100">
            <AppHeader></AppHeader>
            <div className="interface d-flex flex-column ">
                <div className="playbar vw-75 py-5"></div>
                <div className="info w-100 d-flex justify-content-between align-items-start">
                    <div className="caption-info w-75 d-flex flex-column">
                        <div className="toolbar p-4 mb-0">
                            toolbar for highlight and comments on transcription as well as navigation
                        </div>
                        <div className="transcription p-4 d-block d-flex flex-column overflow-scroll">
                            <div className="section d-flex flex-row mb-3">
                                <time className="time text-secondary">2:30</time>
                                <div className="text">Structural engineering is a very important thing yes. This single timestamp has multiple sentences
                                    or messages as they are represented in the api, allowing us to display a sizable amount of text without having to
                                        put it on 1000 time stamps making it impossible to take notes on.
                                </div>
                            </div>
                            <div className="section m-0  d-flex flex-row mb-3">
                                <time className="time text-secondary">2:30</time>
                                <div className="text">Structural engineering is a very important thing yes. This single timestamp has multiple sentences
                                    or messages as they are represented in the api, allowing us to display a sizable amount of text without having to
                                        put it on 1000 time stamps making it impossible to take notes on.
                                </div>
                            </div>
                            <div className="section m-0 d-flex flex-row mb-3">
                                <time className="time text-secondary">2:30</time>
                                <div className="text">Structural engineering is a very important thing yes. This single timestamp has multiple sentences
                                    or messages as they are represented in the api, allowing us to display a sizable amount of text without having to
                                        put it on 1000 time stamps making it impossible to take notes on.
                                </div>
                            </div>
                            <div className="section m-0 d-flex flex-row mb-3">
                                <time className="time text-secondary">2:30</time>
                                <div className="text">Structural engineering is a very important thing yes. This single timestamp has multiple sentences
                                    or messages as they are represented in the api, allowing us to display a sizable amount of text without having to
                                        put it on 1000 time stamps making it impossible to take notes on.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="topics w-25 mt-0 p-4 overflow-scroll">
                        <h2>Topics and Questions</h2>
                        <div className="timestamped-topic d-flex mb-2">
                            <time className="timestamp fw-bold me-3">2:30</time>
                            <div className="description">
                                Topic: Structural Engineering
                            </div>
                        </div>
                        <div className="timestamped-topic d-flex mb-2">
                            <time className="timestamp fw-bold me-3">2:30</time>
                            <div className="description">
                                Topic: Structural Engineering
                            </div>
                        </div>
                        <div className="timestamped-topic d-flex mb-2">
                            <time className="timestamp fw-bold me-3">2:30</time>
                            <div className="description">
                                Topic: Structural Engineering
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TranscriptPage
