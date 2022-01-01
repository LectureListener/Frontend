const TopicsSection = (props) => {
    return (
        <div className="timestamped-topic d-flex mb-2">
            <time className="timestamp fw-bold me-3">
                <button onClick={() => props.skipAudio(props.topic.timestamp)} className="btn p-0">
                    {props.topic.timestamp}
                </button>
            </time>
            <div className="description">
                {props.topic.text}
            </div>
        </div>
    )
}

export default TopicsSection
