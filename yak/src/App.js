import React, {Component} from 'react';
import './App.css';
import Dash from './dashboard/Dash';
import Login from './login/Login.js';
import 'typeface-roboto';


// function onAuthRequired({history}) {
//     history.push('/login');
// }

class App extends Component {

    state = {
        loggedIn: true
    };

    verifyLogin = () => {
        this.setState({
            loggedIn: true
        })
    };

    render() {
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
                    <Dash/>
                </div>
            );
        }

    }
}

export default App;
