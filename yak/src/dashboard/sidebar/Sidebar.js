import React from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/logo/yak-logo-fullbody.svg';
import MaterialIcon from 'material-icons-react';


const Sidebar = () => (
    <div className="sidebarComponent">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">YAK</h1>

        <hr/>

        <ul style={{listStyleType: "none", paddingLeft: 0, textAlign: 'left',  color: "#fff"}}>
            <Link to="/">
                <li style={{paddingLeft: 25}}>
                    <MaterialIcon icon='home' color='#EEEEEE' />  Home
                </li>
            </Link>
            <Link to="/conversion">
                <li style={{paddingLeft: 25}}>
                    <MaterialIcon icon='view_compact' color='#EEEEEE' />  Conversion
                </li>
            </Link>
            <Link to="/export">
                <li style={{paddingLeft: 25}}>
                    <MaterialIcon icon='cloud_download' color='#EEEEEE' />  Export
                </li>
            </Link>
            <Link to="/settings">
                <li style={{paddingLeft: 25}}>
                    <MaterialIcon icon='settings' color='#EEEEEE' />  Settings
                </li>
            </Link>
        </ul>

    </div>
);

export default Sidebar;