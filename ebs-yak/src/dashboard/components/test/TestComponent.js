import React, {Component} from 'react';
import EPie from './ePie';
import EMixed from './eMixed';


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
            </div>
        )
    }
}