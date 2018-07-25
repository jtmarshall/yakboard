import React from 'react';
import {Route} from 'react-router-dom';
import moment from 'moment';
import toolbox from './tools/toolbox';
import FacilityAutoComplete from './tools/facilityAutoComplete';
import SKUFilter from './tools/skuFilter';
import DatePicker from './tools/datePicker';
import Sidebar from './sidebar/Sidebar';
import Home from './components/Home';
import Facility from './components/Facility';
import Export from './components/Export';
import Settings from "./components/Settings";


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
    };



    render() {
        return (
            <div className="dash">
                <FacilityAutoComplete selected={this.state.SelectedFacility} onUpdate={this.updateSelectedFacility}/>
                <DatePicker dateFrame={this.state.DateFrame} onUpdate={this.updateDate}/>
                <SKUFilter selected={this.state.Filter} onUpdate={this.updateSKUFilter}/>

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