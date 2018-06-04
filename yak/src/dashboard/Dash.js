import React from 'react';
import {Route} from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Home from './components/Home';
import Facility from './components/Facility';
import Export from './components/Export';
import Settings from "./components/Settings";


const Dash = (props) => (
    <div className="dash">
        Shared Content (selected facility, datepickers, etc...)
        <hr/>

        <Sidebar/>

        <Route path="/" exact component={Home}/>
        <Route path="/facility" component={Facility}/>
        <Route path="/export" exact component={Export}/>
        <Route path="/settings" exact component={Settings}/>
    </div>
);

export default Dash;