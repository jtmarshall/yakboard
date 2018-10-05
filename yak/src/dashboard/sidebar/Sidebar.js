import React from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/logo/yak-logo-fullbody.svg';
import MaterialIcon from 'material-icons-react';
import SKUFilter from '../tools/skuFilter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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
                    <span>Passport
                        <FormControlLabel
                            control={
                                <Switch defaultChecked value="checkedF" color="default" style={{color: "white"}} />
                            }
                            label="Session"
                            root={{color: "white"}}
                        />
                    </span>
                    <SKUFilter selected={this.props.selected} onUpdate={this.props.onUpdate}
                               rightDrawer={this.props.rightDrawer}/>
                </div>
                <hr/>

                <ul style={{listStyleType: "none", paddingLeft: 0, textAlign: 'left',  color: "#fff"}}>
                    <Link to="/story">
                        <li style={{paddingLeft: 25}}>
                            <MaterialIcon icon='map' color='#EEEEEE' />  Storyboard
                        </li>
                    </Link>
                    <Link to="/conversion">
                        <li style={{paddingLeft: 25}}>
                            <MaterialIcon icon='view_compact' color='#EEEEEE' />  Conversion
                        </li>
                    </Link>
                    <Link to="/builder">
                        <li style={{paddingLeft: 25}}>
                            <MaterialIcon icon='build' color='#EEEEEE' />  Builder
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