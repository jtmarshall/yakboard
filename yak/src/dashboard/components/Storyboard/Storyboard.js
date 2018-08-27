import React, {Component} from 'react';


export default class Storyboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="storyComponent">
                <h3>Storyboard</h3>
                <p> Selected: {this.props.selected}</p>
            </div>
        )
    }
}