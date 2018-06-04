import React, {Component} from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="homeComponent">
                <h2>Home Component</h2>
                <p> Selected: {this.props.SelectedFacility}</p>
            </div>
        )
    }
}