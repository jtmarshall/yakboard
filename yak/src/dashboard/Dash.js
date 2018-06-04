import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import FacilityAutoComplete from './facilityAutoComplete';
import Sidebar from './sidebar/Sidebar';
import Home from './components/Home';
import Facility from './components/Facility';
import Export from './components/Export';
import Settings from "./components/Settings";


class Dash extends Component {

    // TODO: Implement state for facility and date time-frame here to persist through app changes
    state = {
        SelectedFacility: localStorage.getItem("selectedFacilities") != null ?
            localStorage.getItem("selectedFacilities") : [],
        DateFrame: localStorage.getItem("selectedDateFrame") != null ?
            localStorage.getItem("selectedDateFrame") : [],
    };

    updateSelectedFacility = (val) => {
        this.setState({
            SelectedFacility: val
        });
    };

    render() {
        return (
            <div className="dash">
                <FacilityAutoComplete onUpdate={this.updateSelectedFacility}/>

                Shared Content (selected facility, datepickers, etc...)
                <hr/>

                <Sidebar/>

                <Route path="/" exact render={() => <Home selected={this.state.SelectedFacility}/>}/>
                <Route path="/facility" component={Facility}/>
                <Route path="/export" exact component={Export}/>
                <Route path="/settings" exact component={Settings}/>
            </div>
        );
    }
}

export default Dash;