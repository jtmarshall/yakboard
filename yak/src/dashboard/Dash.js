import React from 'react';
import {Route} from 'react-router-dom';
import moment from 'moment';
import toolbox from './tools/toolbox';
import FacilityAutoComplete from './tools/facilityAutoComplete';
import SKUFilter from './tools/skuFilter';
import DatePicker from './tools/datePicker';
import Sidebar from './sidebar/Sidebar';
import Storyboard from './components/Storyboard/Storyboard';
import Conversion from './components/Conversion/Conversion';
import Export from './components/Export/Export';
import Settings from "./components/Settings/Settings";
import Builder from './components/Builder/Builder';


// Global state for local storage
let savedState = [];

class Dash extends React.Component {

    constructor(props) {
        super(props);

        // Retrieve local store
        let yakPak = toolbox.retrievePak();
        console.log(yakPak);

        // If local store not found, initialize base state
        if (yakPak == null) {
            this.state = {
                SelectedFacility: yakPak != null ?
                    yakPak.SelectedFacility : [],
                DateFrame: {
                    From: yakPak != null ? yakPak.DateFrame.From : moment().add(-7, 'days').format('YYYY-MM-DD'),
                    To: yakPak != null ? yakPak.DateFrame.To : moment().format('YYYY-MM-DD'),
                    CompareFrom: yakPak != null ? yakPak.DateFrame.CompareFrom : '',
                    CompareTo: yakPak != null ? yakPak.DateFrame.CompareTo : ''
                },
                Filter: {
                    conversion: [],
                    touch: [],
                    channel: [],
                    source: [],
                    campaign: [],
                    tier: [],
                    medium: [],
                    disorder: [],
                    network: [],
                    targetingMethod: [],
                    format: [],
                    message: [],
                    ageRange: [],
                    ethnicity: [],
                    familyRole: [],
                    gender: [],
                    income: [],
                    interestsBehaviors: [],
                    language: [],
                    education: [],
                    occupation: [],
                    relationship: [],
                    religion: []
                },
                Conversion: {
                    tabValue: 0
                },
                Storyboard: {
                    tabValue: 0,
                    searchMetric: 'ip',
                    storyPivot: 'session'
                }
            };
        } else {
            this.state = toolbox.retrievePak();
        }

        // Set global state so it's not empty
        savedState = this.state;
    }

    // Check if user was authenticated, return true if so
    isAuthenticated() {
        return true;
    }

    // // If not logged in redirect to login
    // componentWillMount(){
    //     if(!this.Auth.loggedIn())
    //         this.props.history.replace('/login');
    // }

    // Set offload func to save to local store just once on unload
    componentDidMount() {
        window.onbeforeunload = function () {
            toolbox.storePak(savedState);
        }
    }

    // Update global state for onbeforeunload func
    componentDidUpdate() {
        savedState = this.state;
    }

    // Update SelectedFacility state; pass back from facility auto complete component
    updateSelectedFacility = (val) => {
        this.setState({
            SelectedFacility: val
        });
    };

    // Update SKUFilter state; pass back from skufilter component
    updateSKUFilter = (val) => {
        this.setState({
            Filter: val
        });

        console.log(this.state);
    };

    // Update DateFrame state
    updateDate = (val) => {
        this.setState({
            DateFrame: val
        });
        console.log(val);
        localStorage.setItem("fromDate", val.From);
        localStorage.setItem("toDate", val.To);
        localStorage.setItem("compareFromDate", val.CompareFrom);
        localStorage.setItem("compareToDate", val.CompareTo);
    };

    // For child elements to update dash state
    updateDashConversion = (name, val) => {
        this.setState({
            Conversion: {
                [name]: val
            }
        })
    };

    // For child elements to update dash state
    updateDashStoryboard = (val) => {
        this.setState({
            Storyboard: val
        });

        console.log(this.state);
    };

    // Reload view
    refreshView = () => {
        window.location.reload();
    };


    render() {
        // Load dashboard if user is legit
        if (this.isAuthenticated()) {
            return (
                <div className="dash">
                    <SKUFilter selected={this.state.Filter} onUpdate={this.updateSKUFilter}
                               rightDrawer={this.state.rightDrawer}/>
                    <FacilityAutoComplete selected={this.state.SelectedFacility}
                                          onUpdate={this.updateSelectedFacility}/>
                    <DatePicker dateFrame={this.state.DateFrame} onUpdate={this.updateDate}
                                refreshView={this.refreshView}/>

                    <Sidebar/>

                    <Route path="/story" render={() => <Storyboard parentState={this.state} updateDash={this.updateDashStoryboard}/>}/>
                    <Route path="/conversion" render={() => <Conversion parentState={this.state} updateDash={this.updateDashConversion}/>}/>
                    <Route path="/builder" render={() => <Builder parentState={this.state}/>}/>
                    <Route path="/export" render={() => <Export selected={this.state.SelectedFacility}/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>User Not Identified!</h2>
                </div>
            );
        }

    }
}

export default Dash;