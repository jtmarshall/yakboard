import {combineReducers} from 'redux';
import {UPDATE_USER} from "./actions";
import moment from 'moment';
import { UPDATE_FILTER, CLEAR_FILTER, UPDATE_FACILITY, UPDATE_DATEFRAME } from "./actions/types";


// generic reducer for similar store functionality updating
function genericReducer(state = {}, {type, payload}) {
    switch (type) {
        case "update":
            return payload;
        default:
            return state;
    }
}

// update payload depending on input case type
function userReducer(state = {}, {type, payload}) {
    switch (type) {
        case "userLoggedIn":
            return payload;
        case "userLoggedOut":
            return payload;
        case UPDATE_USER:
            return payload;
        default:
            return state;
    }
}

function SelectedFacilityReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_FACILITY:
            return Object.assign({}, state, {
                Facility: action.payload.SelectedFacility,
                Domain: action.payload.SelectedFacilityDomain,
            });
        default:
            return state;
    }
}

function DateFrameReducer(state = {}, action) {
    let defaultDateframe = {
        From: '',
        To: '',
        CompareFrom: '',
        CompareTo: ''
    };

    switch (action.type) {
        case "clearDateFrame":
            return defaultDateframe;
        case UPDATE_DATEFRAME:
            return action.payload;
        default:
            return state;
    }
}

function DateFrameQuickPickReducer(state = {}, {type}) {
    let tempDateframe = {
        From: '',
        To: '',
        CompareFrom: '',
        CompareTo: ''
    };

    // Set values for temp dates based on input
    switch (type) {
        case 'today':
            tempDateframe.To = moment();
            tempDateframe.From = moment();
            return tempDateframe;
        case 'yesterday':
            tempDateframe.To = moment().subtract(1, 'days');
            tempDateframe.From = moment().subtract(1, 'days');
            return tempDateframe;
        case 'lastWeek':
            tempDateframe.To = moment().subtract(1, 'weeks').endOf('week');
            tempDateframe.From = moment().subtract(1, 'weeks').startOf('week');
            return tempDateframe;
        case 'lastMonth':
            tempDateframe.To = moment().subtract(1, 'months').endOf('month');
            tempDateframe.From = moment().subtract(1, 'months').startOf('month');
            return tempDateframe;
        case 'last7':
            tempDateframe.To = moment();
            tempDateframe.From = moment().subtract(7, 'days');
            return tempDateframe;
        case 'last30':
            tempDateframe.To = moment();
            tempDateframe.From = moment().subtract(30, 'days');
            return tempDateframe;
        default:
            return state;
    }
}

function FilterReducer(state = {}, action) {
    let defaultFilter = {
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
    };

    switch (action.type) {
        case CLEAR_FILTER:
            return defaultFilter;
        case UPDATE_FILTER:
            return action.payload;
        default:
            return state;
    }
}

// combine and export all reducers
export default combineReducers({
    user: userReducer,
    SelectedFacility: SelectedFacilityReducer,
    DateFrame: DateFrameReducer,
    DateFrameQuickPick: DateFrameQuickPickReducer,
    Filter: FilterReducer,
    Touch: genericReducer,
    Conversion: genericReducer,
    Explorer: genericReducer,
    Storyboard: genericReducer,
    Builder: genericReducer,
    Timeframe: genericReducer,
});