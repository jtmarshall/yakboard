import React from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/logo/yak-logo-fullbody.svg';


const Sidebar = () => (
    <div className="sidebarComponent">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">YAK</h1>

        <hr/>

        <ul style={{listStyleType: "none", padding: 0, color: "#fff"}}>
            <Link to="/">
                <li>
                    Home
                </li>
            </Link>
            <Link to="/facility">
                <li>
                    Facility
                </li>
            </Link>
            <Link to="/export">
                <li>
                    Export
                </li>
            </Link>
            <Link to="/settings">
                <li>
                    Settings
                </li>
            </Link>
        </ul>

    </div>
);

export default Sidebar;