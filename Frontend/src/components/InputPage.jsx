import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"

const InputPage = (props) => {
    const onUpdate = (event) => {
        if (!event.target.files)
            return
        const file = event.target.files[0]
        event.target.value = ""
        props.onFileUpload(file)
    }

    const fileInput = useRef(null)
    const onClick = () => {
        fileInput.current.click()
    }

    return (
        <div className="input-page text-center">
            <button className="btn text-white" onClick={onClick}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <span className="ps-2">Upload</span>
            </button>
            <input className="d-none" type="file" id="upload" onInput={onUpdate.bind(this)} ref={fileInput} accept="audio/wav, audio/mpeg, audio/mp3, audio/wav" />
        </div>
    )
}

export default InputPage
