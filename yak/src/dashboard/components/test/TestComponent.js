import React, {Component} from 'react';
import EPie from './ePie';
import EMixed from './eMixed';
import EVolumeChart from './eVolumeChart';
import EFacilityAdmitGoal from './eFacilityAdmitGoal';


/**
 * Testing area to mash components together.
 */
export default class TestComponent extends Component {

    state = {};

    // update search metric selection
    handleSelect = event => {
        this.setState({[event.target.name]: event.target.value});
    };


    render() {
        return (
            <div className="storyComponent">
                <h3>Test Area</h3>
                <EMixed/>
                <EPie title='Spend | Traffic | Calls' id='pieSpend'/>
                <EVolumeChart/>
                <EFacilityAdmitGoal id='admitGoal'/>
            </div>
        )
    }
}