import React, {Component} from 'react';


export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="homeComponent">
                <h3>Home Component</h3>
                <p> Selected: {this.props.selected}</p>
            </div>
        )
    }
}