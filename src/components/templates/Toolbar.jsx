const Toolbar = (props) => {
    return (
        <div className="toolbar p-4 my-0 d-flex justify-content-between">
            <button class="btn text-white">Highlight Section</button>
            <button class="btn text-white" onClick={props.toggleTranscript}>{props.isFullTranscript ? "View Highlighted Sections" : "View Full Transcript"}</button>
            <button class="btn text-white">Add Comment</button>
        </div>
    )
}

export default Toolbar
