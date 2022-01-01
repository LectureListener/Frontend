
const TranscriptSection = (props) => {
    return (
            <div className="section d-flex flex-row mb-3">
                <button onClick={() => props.skipAudio(props.timestamp)} className="btn time text-secondary">{props.timestamp}</button>
                <div className="transcript-section">
                    { props.message.map((phrase) => (
                        <button onClick={() => props.skipAudio(phrase.timestamp)} className="btn transcript-phrase py-0 my-1 px-1">{phrase.text}</button>
                    ))}
                </div>
            </div>
    )
}

export default TranscriptSection
