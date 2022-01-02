const InputPage = (props) => {
    return (
        <div className="input-page d-flex align-items-center justify-content-around">
            <h5>You can upload video or audio file here</h5>
            <form action="api.js" method="POST" enctype="multipart/form-data">
                <input type="file" accept="audio/*, video/*" multiple />
                <input type="submit" class="btn bg-secondary text-white" value="submit" name="submit"/>
            </form>
        </div>
    )
}

export default InputPage
