import React, { Component } from 'react';
import logo from './assets/logo/yak-logo-fullbody.svg';
import './App.css';
import Dash from './dashboard/Dash';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Dash/>
      </div>
    );
  }
}

export default App;
