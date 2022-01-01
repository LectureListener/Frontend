const Buffer = () => {
    return (
        <div className="box buffer-screen zindex-modal position-fixed start-50">
            <div className="head">
                <span className="text-center"/>
                <p className="text-center">
                    <img src="https://www.intogif.com/resource/image/loading/default.gif" title="load" className="loading-gif"/>
                </p>
                <div className="shadow">
                </div>
                <div className="load d-flex justify-content-center">
                    <p>Loading</p>
                </div>
                <div className="bar">
                    <span id="j"></span>
                    <div id="num">0%</div>
                </div>
            </div>
        </div>           
    )
}

export default Buffer
