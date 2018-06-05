import React from 'react';
import {Route} from 'react-router-dom';
import moment from 'moment';
import FacilityAutoComplete from './tools/facilityAutoComplete';
import DatePicker from './tools/datePicker';
import Sidebar from './sidebar/Sidebar';
import Home from './components/Home';
import Facility from './components/Facility';
import Export from './components/Export';
import Settings from "./components/Settings";


class Dash extends React.Component {

    // TODO: Implement state for facility and date time-frame here to persist through app changes
    state = {
        SelectedFacility: localStorage.getItem("selectedFacilities") != null ?
            localStorage.getItem("selectedFacilities") : [],
        DateFrame: {
            From: localStorage.getItem("fromDate") != null ?
                localStorage.getItem("fromDate") : moment().subtract(7, 'days').format('YYYY-MM-DD'),
            To: localStorage.getItem("toDate") != null ?
                localStorage.getItem("toDate") : moment().format('YYYY-MM-DD')
        }
    };

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
                    <FacilityAutoComplete onUpdate={this.updateSelectedFacility}/>

                    <DatePicker dateFrame={this.state.DateFrame} onUpdate={this.updateDate}/>
                <Sidebar/>

                <Route path="/" exact render={() => <Home selected={this.state.SelectedFacility}/>}/>
                <Route path="/facility" render={() => <Facility selected={this.state.SelectedFacility}/>}/>
                <Route path="/export" render={() => <Export selected={this.state.SelectedFacility}/>}/>
                <Route path="/settings" render={() => <Settings selected={this.state.SelectedFacility}/>}/>
            </div>
        );
    }
}

export default Dash;