import React, {Component} from 'react';
import './App.css';
import Dash from './dashboard/Dash';
import Login from './login/Login.js';
import {connect} from 'react-redux';
import {updateUser} from "./reducers/actions";
import {bindActionCreators} from "redux";


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
        console.log(this.props);

        // migration to typography2
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

        let path = window.location.hash;
        console.log(path);

        if (!this.state.loggedIn) {
            return (
                <div className="App">
                    <Login onSubmit={this.verifyLogin}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <div onClick={this.onUpdateUser}>Update User</div>
                    <Dash/>
                </div>
            );
        }

    }
}

const mapStateToProps = (state, props) => {
    console.log(state, props);

    return {
        products: state.products,
        user: state.user
    }
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        onUpdateUser: updateUser
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(App);
