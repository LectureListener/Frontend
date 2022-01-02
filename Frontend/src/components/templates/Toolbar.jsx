import { faHighlighter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Toolbar = (props) => {
    return (
        <div className="toolbar p-4 my-0 d-flex justify-content-between">
            <button id="highlightButton" className="btn text-white" onClick={() => props.toggleHighlight(!props.highlightToggle)}>
                <FontAwesomeIcon icon={faHighlighter}></FontAwesomeIcon>
                <span className="ps-2">Highlight</span>
            </button>
            <button className="btn btn-grey text-white" onClick={props.toggleTranscript}>{props.isFullTranscript ? "View Highlighted Sections" : "View Full Transcript"}</button>
            <button className="btn btn-grey text-white">Add Comment</button>
        </div>
    )
}

export default Toolbar
