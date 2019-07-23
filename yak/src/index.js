import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import moment from 'moment';
import toolbox from "./dashboard/tools/toolbox";


// Retrieve local store
let yakPak = toolbox.retrievePak();
console.log("Saved PAK: ", JSON.stringify(yakPak));

let defaultState = {
    SelectedFacility: {
        Facility: ['Acadia'],
        Domain: 'www.acadiahealthcare.com',
    },
    DateFrame: {
        From: moment().add(-7, 'days').format('YYYY-MM-DD'),
        To: moment().format('YYYY-MM-DD'),
        CompareFrom: '',
        CompareTo: ''
    },
    Filter: {
        conversion: [],
        touch: [],
        rollup: [],
        channel: [],
        source: [],
        campaign: [],
        tier: [],
        medium: [],
        disorder: [],
        network: [],
        targetingMethod: [],
        format: [],
        message: [],
        ageRange: [],
        ethnicity: [],
        familyRole: [],
        gender: [],
        income: [],
        interestsBehaviors: [],
        language: [],
        education: [],
        occupation: [],
        relationship: [],
        religion: []
    },
    Touch: {
        tabValue: 0
    },
    Conversion: {
        tabValue: 0
    },
    Explorer: {
        tabValue: 0
    },
    Storyboard: {
        tabValue: 0,
        searchMetric: 'ip',
        storyPivot: 'session'
    },
    Builder: {
        Columns: [],
    },
    Timeframe: {
        tabValue: 0
    },
};

// check if saved localstorage has same format as current defaultState
function compareKeys(a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}

console.log(compareKeys(yakPak, defaultState));

// load local state if applicable
if (yakPak !== undefined) {
    defaultState = yakPak;
}

// declare store using all combined reducers and a pre-loaded(default) state;
const store = createStore(
    reducers,
    defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log("STORE");
console.log(store.getState());


// // redux test user action
// const updateUserAction = {
//     type: 'updateUser',
//     payload: {
//         user: 'john'
//     }
// };
//
// store.dispatch(updateUserAction);

try {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>,
        document.getElementById('root'));
    registerServiceWorker();
} catch (e) {
    console.log("ERR: ", e);
}
