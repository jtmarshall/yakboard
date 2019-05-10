import React, {Component} from 'react';
import Card from '../../tools/Card/Card';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from '../../tools/Card/CardBody';
import TextField from '@material-ui/core/TextField';
import FacilityPie from './facilityPie';
import FacilityVolumeChart from './facilityVolumeChart';
import MaterialIcon from 'material-icons-react';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import EPie from "../test/ePie";
import EVolumeChart from "../test/eVolumeChart";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import colorPalette from "../../tools/colorPalette";
import Button from "@material-ui/core/Button";


class FacilityVolume extends Component {

    state = {
        commentBox: '',
        chartToggle: true,
        graphColorIndex: 1,
        graphColor: colorPalette.graphColors.greenBlue,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleToggle = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    colorPaletteToggle = event => {
        let newIndex = (this.state.graphColorIndex + 1)%5;
        let newColor = Object.keys(colorPalette.graphColors)[newIndex];
        this.setState({
            graphColorIndex: newIndex,
            graphColor: colorPalette.graphColors[newColor],
        });

        this.setState({
            state: this.state
        });
    };

    render() {
        return (
            <div className="facilityVolumeComponent">
                <div className="row" style={{display: 'inline-flex', width: '90%', marginBottom: '10px'}}>
                    <div style={{width: '35%', margin: 'auto'}}>
                        <img src={this.props.logo} style={{width: '50%'}} alt="logo"/>
                        <h3><b><em>Volume</em></b></h3>
                    </div>
                    <div style={{width: '100%', margin: 'auto'}}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Highlights"
                            multiline
                            rows="8"
                            rowsMax="12"
                            value={this.state.commentBox}
                            onChange={this.handleChange('commentBox')}
                            margin="normal"
                            variant="outlined"
                            style={{minWidth: '90%', overflowX: 'hidden'}}
                        />
                    </div>
                </div>

                <br/>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.chartToggle}
                            onChange={this.handleToggle('chartToggle')}
                            value="chartToggle"
                            color="primary"
                        />
                    }
                    label="Show New Charts"
                />
                <br/>

                {this.state.chartToggle &&
                    <span>
                        <Button variant="contained" color="primary" style={{color: '#fff'}} onClick={this.colorPaletteToggle}>
                            Toggle Color
                        </Button>
                        <br/>
                        <EPie id='pieSpend' colors={this.state.graphColor} index={this.state.graphColorIndex}/>
                        <EVolumeChart id='eVolumeChart' colors={this.state.graphColor}/>
                    </span>
                }

                {!this.state.chartToggle &&
                    <span>
                        <div className='facilityPieRow'>
                            <FacilityPie color={"info"} title={"Spend"} chartCallData={[11, 14, 13, 8, 10, 12]}/>
                            <FacilityPie color={"info"} title={"Traffic"} chartCallData={[11, 14, 13, 8, 10, 12]}/>
                            <FacilityPie color={"info"} title={"Calls"} chartCallData={[11, 14, 13, 8, 10, 12]}/>
                        </div>


                        <Card className='facilityBarChart' style={{marginTop: '20px'}}>
                            <CardHeader className="facilityCardHeader" color="info">
                                <h4 className="cardTitleWhite">Year/Year by Month</h4>
                            </CardHeader>
                            <CardBody>
                                <FacilityVolumeChart/>
                            </CardBody>
                        </Card>
                    </span>
                }

                <Card>
                    <CardHeader className="facilityCardHeader" color="info">
                        <h4 className="cardTitleWhite">Miscellaneous</h4>
                    </CardHeader>
                    <CardBody>
                        <div className="row" style={{display: 'block', width: '90%'}}>
                            <ul className='ulFacility'>
                                <Tooltip title="Website Updates" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='update' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Collateral" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='import_contacts' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Photos" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='photo' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Video" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='videocam' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Rebrand" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='star_half' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Online Reviews" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='mood' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Media" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='video_library' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Advertisement" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='tv' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Email" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='email' color=''/> 1337
                                    </li>
                                </Tooltip>

                                <Tooltip title="Social Media" placement="bottom">
                                    <li>
                                        <MaterialIcon icon='group_add' color=''/> 1337
                                    </li>
                                </Tooltip>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default FacilityVolume;