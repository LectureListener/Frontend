const Toolbar = (props) => {
    return (
        <div className="toolbar p-4 my-0 d-flex justify-content-between">
            <button className="btn text-white">Highlight Section</button>
            <button className="btn text-white" onClick={props.toggleTranscript}>{props.isFullTranscript ? "View Highlighted Sections" : "View Full Transcript"}</button>
            <button className="btn text-white">Add Comment</button>
        </div>
    )
}

export default Toolbar
