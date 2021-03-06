import React from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/logo/yak-logo-fullbody.svg';
import MaterialIcon from 'material-icons-react';
import DataFilter from '../tools/dataFilter';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


/**
 * Controls our sidebar nav AND houses our DataFilter component.
 * We map our links to the routes we specified in Dash.
 */
class Sidebar extends React.Component {

    state = {
        subConversion: false,
        subTimeframe: false,
    };

    // Show/hide sub-navs
    toggleHidden = name => event => {
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
                    <Link to="/export">
                        <Tooltip title="Export a File" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='cloud_download' color='#EEEEEE'/> Export
                            </li>
                        </Tooltip>
                    </Link>
                    <Link to="/facility">
                        <Tooltip title="Facility Reports" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='view_quilt' color='#EEEEEE'/> Facility
                            </li>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Timeframe Show/Hide" placement="bottom">
                        <li style={{paddingLeft: 25, cursor: "pointer"}} onClick={this.toggleHidden("subTimeframe")}>
                            <MaterialIcon icon='calendar_today' color='#EEEEEE'/> Timeframe
                        </li>
                    </Tooltip>
                    {this.state.subTimeframe && <ul className="sidebarSubNav">
                        <Link to="/timeframe">
                            <li>Custom</li>
                        </Link>
                        <Link to="/timeframe/lastWeek">
                            <li>Last Week</li>
                        </Link>
                        <Link to="/timeframe/lastMonth">
                            <li>Last Month</li>
                        </Link>
                    </ul>}
                    <Link to="/touch">
                        <Tooltip title="Touches led to Conversions" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='touch_app' color='#EEEEEE'/> Touch
                            </li>
                        </Tooltip>
                    </Link>

                    <Tooltip title="Conversion Show/Hide" placement="bottom">
                        <li style={{paddingLeft: 25, cursor: "pointer"}} onClick={this.toggleHidden("subConversion")}>
                            <MaterialIcon icon='how_to_reg' color='#EEEEEE'/> Conversion
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

                    <Link to="/geo">
                        <Tooltip title="Geo Data" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='map' color='#EEEEEE'/> Map
                            </li>
                        </Tooltip>
                    </Link>
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
                    <Link to="/test">
                        <Tooltip title="Testing Area" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='whatshot' color='#EEEEEE'/> Test
                            </li>
                        </Tooltip>
                    </Link>
                    <hr/>
                    <Link to="/mor">
                        <Tooltip title="MOR" placement="bottom">
                            <li style={{paddingLeft: 25}}>
                                <MaterialIcon icon='assessment' color='#EEEEEE'/> MOR
                            </li>
                        </Tooltip>
                    </Link>
                </ul>

                <div className="sidebarBottom">
                    <hr/>
                    <DataFilter selected={this.props.selected} onUpdate={this.props.onUpdate}
                                rightDrawer={this.props.rightDrawer}/>
                </div>
            </div>
        );
    }
}

export default Sidebar;