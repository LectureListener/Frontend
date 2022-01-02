import { Link } from "react-router-dom";
import { useState } from 'react';
import logo from "../images/logo.png";
const AppHeader = (props) => {

    return (
        <div id="header" className="header d-flex vw-100">
            <div className="newButton">
                <button type="button" onClick={props.displayInput}>new</button>
            </div>
            <div className="saveButton">
                <button type="button">save</button>
            </div>
            <div className="loadButton">
                <button type="button">load</button>
            </div>
            <div className="title d-flex mx-auto">
            <h1>LECTURE LISTENER</h1>
            <img className="image logo" alt="logo" src={logo}></img>
            </div>
        </div>
    )
}

export default AppHeader
