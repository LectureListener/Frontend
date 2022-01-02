
const TranscriptSection = (props) => {
    return (
        <div className="section d-flex flex-row mb-3">
            <button onClick={() => props.skipAudio(props.timestamp)} className="btn time text-secondary">{props.timestamp}</button>
            <div className="transcript-section">
                { props.message.map((phrase) => (
                    <a id={phrase.id} href="#" onClick={() => props.skipAudio(phrase.timestamp)} className="text-decoration-none text-dark transcript-phrase py-0 my-1">{phrase.text}&nbsp;</a>
                ))}
            </div>
        </div>
    )
}

export default TranscriptSection
