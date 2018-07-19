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
                Network: "",
                TargetingMethod: "",
                Format: "",
                Message: "",
                AgeRange: "",
                Ethnicity: "",
                FamilyRole: "",
                Gender: "",
                Income: "",
                InterestsBehaviors: "",
                Language: "",
                Education: "",
                Occupation: "",
                Relationship: "",
                Religion: ""
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

    render() {
        return (
            <div className="dash">
                <FacilityAutoComplete selected={this.state.SelectedFacility} onUpdate={this.updateSelectedFacility}/>
                <DatePicker dateFrame={this.state.DateFrame} onUpdate={this.updateDate}/>

                <ExpansionPanel style={{width: '90%', display: 'inline-block', backgroundColor: '#EEEEEE', boxShadow: 'none'}}>
                    <ExpansionPanelSummary expandIcon={<MaterialIcon icon='keyboard_arrow_down' color='#00C853' />}>
                        <Typography className="">Filter Options</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <FormControl className="">
                                <InputLabel htmlFor="source">Source</InputLabel>
                                <Select
                                    value={this.state.filterNetwork}
                                    onChange={this.handleSelect}
                                    inputProps={{
                                        name: 'source',
                                        id: 'source',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'directories'}>Directories</MenuItem>
                                    <MenuItem value={'internal-directories'}>Internal Directories</MenuItem>
                                    <MenuItem value={'lead-gen'}>Lead Gen</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                    <MenuItem value={'placement'}>Placement</MenuItem>
                                    <MenuItem value={'search'}>Search</MenuItem>
                                    <MenuItem value={'search-engines'}>Search Engines</MenuItem>
                                    <MenuItem value={'sign-up'}>Sign Up</MenuItem>
                                    <MenuItem value={'social'}>Social</MenuItem>
                                    <MenuItem value={'sponsorship'}>Sponsorship</MenuItem>
                                </Select>
                            </FormControl>
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