import React from 'react';
import {Route} from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Home from './components/Home';
import Export from './components/Export';


const Dash = () => (
    <div className="dash">
        <Sidebar/>
        <Route path="/" exact component={Home}/>
        <Route path="/export" exact component={Export}/>
    </div>
);

export default Dash;