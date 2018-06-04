import React, {Component} from 'react';
import './App.css';
import Dash from './dashboard/Dash';


class App extends Component {

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
    }
    ;

    render() {
        return (
            <div className="App">
                <Dash state={this.state} onUpdate={this.updateSelectedFacility}/>
            </div>
        );
    }
}

export default App;
