import React from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/logo/yak-logo-fullbody.svg';
import MaterialIcon from 'material-icons-react';
import SKUFilter from '../tools/skuFilter';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subConversion: false,
            subTimeframe: false,
        };
    }

    toggleHidden = name => event => {
        console.log(name, !this.state[name]);
        this.setState({
            [name]: !this.state[name]
        });
    };

    render() {
        return (
            <div className="sidebarComponent">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">YAK</h1>

                <hr/>

                <ul style={{listStyleType: "none", paddingLeft: 0, textAlign: 'left', color: "#fff"}}>
                    <Link to="/help">
                        <Tooltip title="HELP!" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='error' color='#EEEEEE'/> Help Section
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/report">
                        <Tooltip title="Reports & Exports" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='timeline' color='#EEEEEE'/> Report/Export
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/touch">
                        <Tooltip title="Touches led to Conversions" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='touch_app' color='#EEEEEE'/> Touch
                            </li>
                        </Tooltip>
                    </Link>

                    <Tooltip title="Conversion Show/Hide" placement="bottom">
                        <li style={{paddingLeft: 25, cursor: "pointer"}}>
                            <span onClick={this.toggleHidden("subConversion")}>
                                <MaterialIcon icon='how_to_reg' color='#EEEEEE'/> Conversions
                            </span>
                        </li>
                    </Tooltip>
                    {this.state.subConversion && <ul className="sidebarSubNav">
                        <Link to="/conversion/">
                            <li>Summary</li>
                        </Link>
                        <Link to="/conversion/path">
                            <li>Path</li>
                        </Link>
                    </ul>}

                    <Link to="/behavior">
                        <Tooltip title="User Behavior & Jumping" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='face' color='#EEEEEE'/> Behavior
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/audience">
                        <Tooltip title="Audience type & SKU mapping" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='assignment' color='#EEEEEE'/> Audience/SKU
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/lob">
                        <Tooltip title="Line of Business/Facility Type" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='business' color='#EEEEEE'/> LOB
                            </li>
                        </Tooltip>
                    </Link>

                    <Tooltip title="Timeframe Show/Hide" placement="bottom">
                        <li style={{paddingLeft: 25, cursor: "pointer"}}>
                            <span onClick={this.toggleHidden("subTimeframe")}>
                                <MaterialIcon icon='calendar_today' color='#EEEEEE'/> Timeframe
                            </span>
                        </li>
                    </Tooltip>
                    {this.state.subTimeframe && <ul className="sidebarSubNav">
                        <Link to="/timeframe">
                            <li>Summary</li>
                        </Link>
                        <Link to="/timeframe">
                            <li>Last Week</li>
                        </Link>
                        <Link to="/timeframe">
                            <li>Last Month</li>
                        </Link>
                    </ul>}

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