import React from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/logo/yak-logo-fullbody.svg';
import MaterialIcon from 'material-icons-react';
import SKUFilter from '../tools/skuFilter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebarComponent">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">YAK</h1>

                <hr/>
                <div>
                    <span>
                        Passport
                        <FormControlLabel
                            control={
                                <Switch defaultChecked value="checkedF" color="default" style={{color: "white"}}/>
                            }
                            root={{color: "white"}}
                        />
                        Session
                    </span>
                    <SKUFilter selected={this.props.selected} onUpdate={this.props.onUpdate}
                               rightDrawer={this.props.rightDrawer}/>
                </div>
                <hr/>

                <ul style={{listStyleType: "none", paddingLeft: 0, textAlign: 'left', color: "#fff"}}>
                    <Link to="/story">
                        <Tooltip title="View user data" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='map' color='#EEEEEE'/> Storyboard
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/conversion">
                        <Tooltip title="View only conversion data" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='view_compact' color='#EEEEEE'/> Conversion
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/explorer">
                        <Tooltip title="Explore uncurated views" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='explore' color='#EEEEEE'/> Explorer
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/export">
                        <Tooltip title="Export data to CSV" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='cloud_download' color='#EEEEEE'/> Export
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/settings">
                        <Tooltip title="User Settings" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='settings' color='#EEEEEE'/> Settings
                            </li>
                        </Tooltip>
                    </Link>
                </ul>

                <div className="sidebarBottom">
                    <hr/>
                    <SKUFilter selected={this.props.selected} onUpdate={this.props.onUpdate}
                               rightDrawer={this.props.rightDrawer}/>
                </div>
            </div>
        );
    }
}

export default Sidebar;