import React from 'react';
import {Route} from 'react-router-dom';
import moment from 'moment';
import toolbox from './tools/toolbox';
import FacilityAutoComplete from './tools/facilityAutoComplete';
import DatePicker from './tools/datePicker';
import Sidebar from './sidebar/Sidebar';
import Home from './components/Home';
import Facility from './components/Facility';
import Export from './components/Export';
import Settings from "./components/Settings";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import MaterialIcon from 'material-icons-react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


// Global state for local storage
let savedState = [];

class Dash extends React.Component {

    constructor(props) {
        super(props);

        // Retrieve local store
        let yakPak = toolbox.retrievePak();

        this.state = {
            SelectedFacility: yakPak != null ?
                yakPak.SelectedFacility : [],
            DateFrame: {
                From: yakPak != null ? yakPak.DateFrame.From : moment().add(-7, 'days').format('YYYY-MM-DD'),
                To: yakPak != null ? yakPak.DateFrame.To : moment().format('YYYY-MM-DD')
            },
            Filter: {
                network: "",
                targetingMethod: "",
                format: "",
                message: "",
                ageRange: "",
                ethnicity: "",
                familyRole: "",
                gender: "",
                income: "",
                interestsBehaviors: "",
                language: "",
                education: "",
                occupation: "",
                relationship: "",
                religion: ""
            }
        };

        // Set global state so it's not empty
        savedState = this.state;
    }

    // // If not logged in redirect to login
    // componentWillMount(){
    //     if(!this.Auth.loggedIn())
    //         this.props.history.replace('/login');
    // }

    // Set offload func to save to local store just once on unload
    componentDidMount() {
        window.onbeforeunload = function() {
            toolbox.storePak(savedState);
        }
    }

    // Update global state for onbeforeunload func
    componentDidUpdate() {
        savedState = this.state;
    }

    // Update SelectedFacility state
    updateSelectedFacility = (val) => {
        this.setState({
            SelectedFacility: val
        });
    };

    // Update DateFrame state
    updateDate = (val) => {
        this.setState({
            DateFrame: val
        });
        console.log(val);
        localStorage.setItem("fromDate", val.From);
        localStorage.setItem("toDate", val.To);
    };

    handleSelect = name => event => {
        console.log(event.target.name, event.target.value);
        // dummy object so we don't clear other filter values
        let dummyObj = this.state.Filter;
        dummyObj[name] = event.target.value;

        this.setState({
            Filter: dummyObj
        });
        console.log(this.state.Filter);
    };

    render() {
        return (
            <div className="dash">
                <FacilityAutoComplete selected={this.state.SelectedFacility} onUpdate={this.updateSelectedFacility}/>
                <DatePicker dateFrame={this.state.DateFrame} onUpdate={this.updateDate}/>

                <ExpansionPanel style={{width: '90%', display: 'inline-block', backgroundColor: '#EEEEEE', boxShadow: 'none', margin: '0'}}>
                    <ExpansionPanelSummary expandIcon={<MaterialIcon icon='keyboard_arrow_down' color='#00C853' />}>
                        <Typography className="">Filter Options</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <form className="" noValidate autoComplete="off">
                                <FormControl style={{minWidth: '140px', paddingRight: '4px'}} className="">
                                    <InputLabel htmlFor="filterNetwork">Network</InputLabel>
                                    <Select
                                        value={this.state.Filter.network}
                                        onChange={this.handleSelect('network')}
                                        inputProps={{
                                            name: 'network',
                                            id: 'filterNetwork',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'a0'}>All</MenuItem>
                                        <MenuItem value={'a1'}>Search</MenuItem>
                                        <MenuItem value={'a2'}>Display</MenuItem>
                                        <MenuItem value={'a3'}>Social</MenuItem>
                                        <MenuItem value={'a4'}>Email</MenuItem>
                                        <MenuItem value={'a5'}>Ad_Video</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl style={{minWidth: '140px', paddingLeft: '4px', paddingRight: '4px'}} className="">
                                    <InputLabel htmlFor="filterTargeting">Targeting</InputLabel>
                                    <Select
                                        value={this.state.Filter.targetingMethod}
                                        onChange={this.handleSelect('targetingMethod')}
                                        inputProps={{
                                            name: 'targetingMethod',
                                            id: 'filterTargeting',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'b0'}>All</MenuItem>
                                        <MenuItem value={'b1'}>KWD</MenuItem>
                                        <MenuItem value={'b2'}>MP</MenuItem>
                                        <MenuItem value={'b3'}>MP-KWD</MenuItem>
                                        <MenuItem value={'b4'}>Topic</MenuItem>
                                        <MenuItem value={'b5'}>Topic-KWD</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl style={{minWidth: '140px', paddingLeft: '4px', paddingRight: '4px'}}>
                                    <InputLabel htmlFor="filterFormat">Format</InputLabel>
                                    <Select
                                        value={this.state.Filter.format}
                                        onChange={this.handleSelect('format')}
                                        inputProps={{
                                            name: 'format',
                                            id: 'filterFormat',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'c0'}>All</MenuItem>
                                        <MenuItem value={'c1'}>CanvasAd</MenuItem>
                                        <MenuItem value={'c2'}>ETA</MenuItem>
                                        <MenuItem value={'c3'}>GIF</MenuItem>
                                        <MenuItem value={'c4'}>GmailAd</MenuItem>
                                        <MenuItem value={'c5'}>HTML</MenuItem>
                                        <MenuItem value={'c6'}>Image Carousel</MenuItem>
                                        <MenuItem value={'c7'}>Lightbox</MenuItem>
                                        <MenuItem value={'c8'}>Link Post</MenuItem>
                                        <MenuItem value={'c9'}>Photo Post</MenuItem>
                                        <MenuItem value={'c10'}>Responsive</MenuItem>
                                        <MenuItem value={'c11'}>Static Image</MenuItem>
                                        <MenuItem value={'c12'}>Video</MenuItem>
                                        <MenuItem value={'c13'}>Video Carousel</MenuItem>
                                        <MenuItem value={'c14'}>Long Content - No Image</MenuItem>
                                        <MenuItem value={'c15'}>Long Content - Image</MenuItem>
                                        <MenuItem value={'c16'}>Short Content - No Image</MenuItem>
                                        <MenuItem value={'c17'}>Short Content - Image</MenuItem>
                                        <MenuItem value={'c18'}>Banner</MenuItem>
                                        <MenuItem value={'c19'}>Profile</MenuItem>
                                        <MenuItem value={'c20'}>Text Ad</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl style={{minWidth: '140px', paddingLeft: '4px', paddingRight: '4px'}}>
                                    <InputLabel htmlFor="filterMessage">Message</InputLabel>
                                    <Select
                                        value={this.state.Filter.message}
                                        onChange={this.handleSelect('message')}
                                        inputProps={{
                                            name: 'message',
                                            id: 'filterMessage',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'d0'}>All</MenuItem>
                                        <MenuItem value={'d1'}>About - General</MenuItem>
                                        <MenuItem value={'d2'}>About - Other</MenuItem>
                                        <MenuItem value={'d3'}>About - Self</MenuItem>
                                        <MenuItem value={'d4'}>Benefits - General</MenuItem>
                                        <MenuItem value={'d5'}>Benefits - Other</MenuItem>
                                        <MenuItem value={'d6'}>Benefits - Self</MenuItem>
                                        <MenuItem value={'d7'}>Emotion - General</MenuItem>
                                        <MenuItem value={'d8'}>Emotion - Other</MenuItem>
                                        <MenuItem value={'d9'}>Emotion - Self</MenuItem>
                                        <MenuItem value={'d10'}>Leading - General</MenuItem>
                                        <MenuItem value={'d11'}>Leading - Other</MenuItem>
                                        <MenuItem value={'d12'}>Leading - Self</MenuItem>
                                        <MenuItem value={'d13'}>Scare - General</MenuItem>
                                        <MenuItem value={'d14'}>Scare - Other</MenuItem>
                                        <MenuItem value={'d15'}>Scare - Self</MenuItem>
                                        <MenuItem value={'d16'}>Stats - General</MenuItem>
                                        <MenuItem value={'d17'}>Stats - Other</MenuItem>
                                        <MenuItem value={'d18'}>Stats - Self</MenuItem>
                                        <MenuItem value={'d19'}>Urgent - General</MenuItem>
                                        <MenuItem value={'d20'}>Urgent - Other</MenuItem>
                                        <MenuItem value={'d21'}>Urgent - Self</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Sidebar/>

                <Route exact path="/" render={() => <Home selected={this.state.SelectedFacility}/>}/>
                <Route path="/facility" render={() => <Facility selected={this.state.SelectedFacility}/>}/>
                <Route path="/export" render={() => <Export selected={this.state.SelectedFacility}/>}/>
                <Route path="/settings" render={() => <Settings selected={this.state.SelectedFacility}/>}/>
            </div>
        );
    }
}

export default Dash;