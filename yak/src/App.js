import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Dash from './dashboard/Dash';
import Login from './login/Login.js';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import Settings from "./dashboard/components/Settings/Settings";


// function onAuthRequired({history}) {
//     history.push('/login');
// }

class App extends Component {

    constructor(props) {
        super(props);
        this.onUpdateUser = this.onUpdateUser.bind(this);
    }

    state = {
        loggedIn: true
    };

    verifyLogin = () => {
        this.setState({
            loggedIn: true
        })
    };

    onUpdateUser() {
        this.props.onUpdateUser('sammy');
    }

    render() {
        // migration to typography2
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

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

const mapStateToProps = (state) => {
    return { items: state.items };
};

// const mapActionsToProps = {
//     onUpdateUser: updateUser,
//     onApiRequest: getFacilityList
// };

// const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
//     return {};
// };

export default withRouter(connect(mapStateToProps)(App));
