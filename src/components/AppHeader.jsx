import { Link } from "react-router-dom";

const AppHeader = () => {
    return (
        <div id="header" className="header d-flex vw-100">
            <Link to="/menu">
                <button class="btn menu-button bg-secondary text-white">Menu</button>
            </Link>
            <div className="title d-flex mx-auto">
                <img className="image logo" alt="logo" src="#"></img>
                <h4>Lecture Listener</h4>
            </div>
        </div>
    )
}

export default AppHeader
