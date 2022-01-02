const LoadId = (props) => {
    return (
        <div>
            <div class="modal-body">
                <div className="load px-5 d-flex justify-content-center">
                    <span className="input-group-text text-secondary fw-bold text-center load-text">Enter ID</span>
                    <input className="form-control text-center w-75 text-secondary fw-bold" type="number" id="load"/>
                    <button className="btn text-white" onClick={props.onLoad}>Load Transcript</button>
                </div>                    
            </div>
        </div>
    )
}

export default LoadId
