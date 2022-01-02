import { faHighlighter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Toolbar = (props) => {
    return (
        <div className="toolbar p-4 my-0 d-flex justify-content-between">
            <button className="btn text-white">
                <FontAwesomeIcon icon={faHighlighter}></FontAwesomeIcon>
                <span className="ps-2">Highlight</span>
            </button>
            <button className="btn text-white" onClick={props.toggleTranscript}>{props.isFullTranscript ? "View Highlighted Sections" : "View Full Transcript"}</button>
            <button className="btn text-white">Add Comment</button>
        </div>
    )
}

export default Toolbar
