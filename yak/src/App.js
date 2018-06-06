import React, {Component} from 'react';
import './App.css';
import Dash from './dashboard/Dash';
import {Route} from 'react-router-dom';
import Login from './login/Login.js';


class App extends Component {

    render() {
        let path = window.location.hash;
        console.log(path);

        if (path === '#/login') {
            return (
                <div className="App">
                    <Route exact path="/login" component={Login} />
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Dash/>
                </div>
            );
        }

    }
}

export default App;
