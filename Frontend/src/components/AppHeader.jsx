import { Link } from "react-router-dom";
import { useState } from 'react';
import logo from "../images/logo.png";
const AppHeader = (props) => {
    return (
        <div id="header" className="header d-flex vw-100">
            <div className="newButton">
                <button type="button" onClick={() => props.changePage("input")}>new</button>
            </div>
            <div className="saveButton">
                <button type="button" onClick={() => props.changePage("save")}>save</button>
            </div>
            <div className="loadButton">
                <button type="button" onClick={() => props.changePage("load")}>load</button>
            </div>
            <div className="title d-flex mx-auto">
            <h2 className="align-self-center">LECTURE LISTENER</h2>
            <img className="image logo" alt="logo" src={logo}></img>
            </div>
        </div>
    )
}

export default AppHeader
