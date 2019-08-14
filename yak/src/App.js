import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Dash from './dashboard/Dash';
import Login from './login/Login.js';
import {connect} from 'react-redux';
import {withRouter} from "react-router";


// function onAuthRequired({history}) {
//     history.push('/login');
// }

class App extends Component {
    state = {
        loggedIn: true
    };

    // login request/logic goes here
    verifyLogin = () => {
        this.setState({
            loggedIn: true
        })
    };

    render() {
        // migration to typography2
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

        // return 2 different apps depending on if user is logged in
        if (!this.state.loggedIn) {
            return (
                <div className="App">
                    <Login onSubmit={this.verifyLogin}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Route path="/*" render={() => <Dash store={this.props.store}/>}/>
                </div>
            );
        }
    }
}

// for redux
const mapStateToProps = (state) => {
    return { items: state.items };
};

export default withRouter(connect(mapStateToProps)(App));
