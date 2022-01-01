
const InputPage = () => {
    return (
        <div>
            <a href="https://logo.com/">
            <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" title="lecture organizer" width="200px" height="100px" />
            </a>
                <div>
                <h1>LECTURE ORGANIZER</h1>
                <h3>You can upload video or audio file here</h3>
                <form action="api.js" method="POST" enctype="multipart/form-data">
                <input type="file" accept="audio/*, video/*" multiple />
                <input type="submit" value="submit" name="submit"/>
                </form>
            </div> 
        </div>
    )
}

export default InputPage
