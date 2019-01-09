import React, {Component} from 'react';
import Card from '../../tools/Card/Card';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from '../../tools/Card/CardBody';
import TextField from '@material-ui/core/TextField';
import FacilityPie from './facilityPie';
import FacilityVolumeChart from './facilityVolumeChart';


class FacilityVolume extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        commentBox: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div className="facilityVolumeComponent">

                <div className="row" style={{display: 'inline-flex', width: '90%', alignItems: 'center'}}>
                    <div style={{width: '40%', margin: 'auto'}}>
                        <h3>Volume</h3>
                    </div>
                    <div style={{width: '55%'}}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Comments"
                            multiline
                            rows="8"
                            rowsMax="12"
                            value={this.state.commentBox}
                            onChange={this.handleChange('commentBox')}
                            margin="normal"
                            variant="outlined"
                            style={{minWidth: '80%', paddingTop: '6px', overflowX: 'hidden'}}
                        />
                    </div>
                </div>

                <FacilityPie color={"info"} title={"Spend"} chartCallData={[11, 14, 13, 8, 10, 12]}/>
                <FacilityPie color={"info"} title={"Traffic"} chartCallData={[11, 14, 13, 8, 10, 12]}/>
                <FacilityPie color={"info"} title={"Calls"} chartCallData={[11, 14, 13, 8, 10, 12]}/>

                <Card>
                    <CardBody>
                        <FacilityVolumeChart/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default FacilityVolume;