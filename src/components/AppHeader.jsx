import { Link } from "react-router-dom";
import { useState } from 'react';
import logo from "../images/logo.png";
import InputPage from './InputPage';
const AppHeader = () => {

    const [inputPage, displayInputPage] = useState(false);

    return (
        <div id="header" className="header d-flex vw-100">
            <button onClick={() => displayInputPage(true)} class="btn menu-button bg-secondary text-white">Menu</button>
            {inputPage ? <InputPage return={() => displayInputPage(false)}/> : null }
            <div className="newButton">
                <botton type="button" onclick="'InputPage.jsx'">new</botton>
            </div>
            <div className="saveButton">
                <botton type="button">save</botton>
            </div>
            <div className="loadButton">
                <botton type="button">load</botton>
            </div>
            <div className="title d-flex mx-auto">
                <img className="image logo" alt="logo" src={logo}></img>
                <h4>Lecture Listener</h4>
            </div>
        </div>
    )
}

export default AppHeader
