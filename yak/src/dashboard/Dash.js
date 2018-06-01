import React from 'react';
import {Route} from 'react-router-dom';
import Export from './components/Export';


const Dash = () => (
    <div className="dash">
        <Route path="/export" exact component={Export}/>
    </div>
);

export default Dash;