import logo from "../images/logo.png";

const InputPage = (props) => {
    return (
        <div className="zindex-modal input-page d-flex vw-100 vh-100 flex-column align-items-center justify-content-start">
            <img src={logo} className="w-25" title="lecture organizer" />
                <div>
                <h1>LECTURE ORGANIZER</h1>
                <h3>You can upload video or audio file here</h3>
                <form action="api.js" method="POST" enctype="multipart/form-data">
                <input type="file" accept="audio/*, video/*" multiple />
                <input type="submit" class="btn bg-secondary text-white" value="submit" name="submit"/>
                </form>
            </div> 
            <button onClick={props.return} class="btn menu-button bg-secondary text-white mt-5">Go Back</button>
        </div>
    )
}

export default InputPage
