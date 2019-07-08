import React from 'react';
import {Route} from 'react-router-dom';
import toolbox from './tools/toolbox';
import FacilityAutoComplete from './tools/facilityAutoComplete';
import Sidebar from './sidebar/Sidebar';
import Conversion from './components/Conversion/Conversion';
import ConversionPath from './components/Conversion/ConversionPath';
import Export from './components/Export/Export';
import Settings from "./components/Settings/Settings";
import Explorer from "./components/Explorer/Explorer";
import DateComponent from './tools/DateComponent';
import Touch from "./components/Touch/Touch";
import Timeframe from "./components/Timeframe/Timeframe";
import Geo from "./components/Geo/Geo";
import PrintComponent from './components/Facility/PrintComponent';
import TestComponent from './components/test/TestComponent';
import MORComponent from './components/MOR/MORComponent';
import {updateFacility, updateDateFrame} from '../reducers/actions';
import {connect} from "react-redux";


// Global state for local storage
let savedState = [];

const mapStateToProps = state => {
    return {
        state: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFacility: (facilityObj) => dispatch(updateFacility(facilityObj)),
        updateDateFrame: (dateObj) => dispatch(updateDateFrame(dateObj)),
    };
};

class Dash extends React.Component {
    // Map state to props from redux
    state = this.props.state;

    constructor(props) {
        super(props);

        // // If local store not found, initialize base state
        // if (yakPak == null) {
        //     this.state = {
        //         SelectedFacility: {
        //             Facility: '',
        //             Domain: '',
        //         },
        //         DateFrame: {
        //             From: moment().add(-7, 'days').format('YYYY-MM-DD'),
        //             To: moment().format('YYYY-MM-DD'),
        //             CompareFrom: '',
        //             CompareTo: ''
        //         },
        //         SecondaryDateCheck: false,
        //         Filter: {
        //             conversion: [],
        //             touch: [],
        //             rollup: [],
        //             channel: [],
        //             source: [],
        //             campaign: [],
        //             tier: [],
        //             medium: [],
        //             disorder: [],
        //             network: [],
        //             targetingMethod: [],
        //             format: [],
        //             message: [],
        //             ageRange: [],
        //             ethnicity: [],
        //             familyRole: [],
        //             gender: [],
        //             income: [],
        //             interestsBehaviors: [],
        //             language: [],
        //             education: [],
        //             occupation: [],
        //             relationship: [],
        //             religion: []
        //         },
        //         Touch: {
        //             tabValue: 0
        //         },
        //         Conversion: {
        //             tabValue: 0
        //         },
        //         Explorer: {
        //             tabValue: 0
        //         },
        //         Storyboard: {
        //             tabValue: 0,
        //             searchMetric: 'ip',
        //             storyPivot: 'session'
        //         },
        //         Builder: {
        //             Columns: [],
        //         },
        //         Timeframe: {
        //             tabValue: 0
        //         },
        //     };
        // } else {
        //     this.state = toolbox.retrievePak();
        // }

        // Set global state so it's not empty
        savedState = this.state;
    }

    // Check if user was authenticated, return true if so
    isAuthenticated() {
        return true;
    }

    // // If not logged in redirect to login
    // componentWillMount(){
    //     if(!this.Auth.loggedIn())
    //         this.props.history.replace('/login');
    // }

    // Set offload func to save to local store just once on unload
    componentDidMount() {
        window.onbeforeunload = function () {
            toolbox.storePak(savedState);
        }
    }

    // Update global state for onbeforeunload func
    componentDidUpdate() {
        savedState = this.state;
    }

    // Update SelectedFacility state; pass back from facility auto complete component
    updateSelectedFacility = (name, domain) => {
        this.setState({
            SelectedFacility: {
                Facility: name,
                Domain: domain,
            },
        }, () => {
            if (this.state.SelectedFacility.Facility.length > 0) {
                let facilityObj = {
                    facility: name,
                    domain: domain
                };
                this.props.updateFacility(facilityObj);
                this.refreshView();
            }
        });
    };

    // Update DataFilter state; pass back from skufilter component
    updateSKUFilter = (val) => {
        this.setState({
            Filter: val
        });
        console.log(this.state);
    };

    // Update DateFrame state
    updateDate = (val) => {
        this.setState({
            DateFrame: val
        });
        this.props.updateDateFrame(val);
    };

    // For child elements to update dash state
    updateDashConversion = (name, val) => {
        this.setState({
            Conversion: {
                [name]: val
            }
        })
    };

    // For child elements to update dash state
    updateDashTimeframe = (name, val) => {
        this.setState({
            Timeframe: {
                [name]: val
            }
        })
    };

    // For child elements to update dash state
    updateDashStoryboard = (val) => {
        this.setState({
            Storyboard: val
        });
    };

    // For child elements to update dash state
    updateDashExplorer = (name, val) => {
        this.setState({
            Explorer:  {
                [name]: val
            }
        });
    };

    // Toggles secondary date checkbox
    updateSecondaryCheck = (val) => {
        this.setState({
            SecondaryDateCheck: val
        });
    };

    // Reload view
    refreshView = () => {
        window.location.reload();
    };

    render() {
        // Load dashboard if user is legit
        if (this.isAuthenticated()) {
            return (
                <div className="dash">
                    <Sidebar selected={this.state.Filter} onUpdate={this.updateSKUFilter}
                             rightDrawer={this.state.rightDrawer}/>

                    <div className="componentContainer">
                        <div className="header">
                            <FacilityAutoComplete selected={this.state.SelectedFacility}
                                                  onUpdate={this.updateSelectedFacility}/>
                            <DateComponent secondaryCheckbox={this.state.SecondaryDateCheck}
                                           onUpdate={this.updateDate}
                                           refreshView={this.refreshView}
                                           updateSecondary={this.updateSecondaryCheck}
                            />
                        </div>

                        <Route path="/test" render={() => <TestComponent parentState={this.state}/>}/>
                        <Route path="/touch" render={() => <Touch parentState={this.state} updateDash={this.updateDashStoryboard}/>}/>
                        <Route exact path="/conversion" render={() => <Conversion parentState={this.state} updateDash={this.updateDashConversion}/>}/>
                        <Route path="/conversion/path" render={() => <ConversionPath parentState={this.state} updateDash={this.updateDashConversion}/>}/>
                        <Route path="/explorer/" render={() => <Explorer parentState={this.state} updateDash={this.updateDashExplorer}/>}/>
                        <Route path="/export" render={() => <Export selected={this.state.SelectedFacility}/>}/>
                        <Route exact path="/timeframe" render={(matchProps) => <Timeframe {...matchProps}
                                                                                          parentState={this.state}
                                                                                          updateDash={this.updateDashTimeframe}/>}/>
                        <Route path="/timeframe/:id" render={(matchProps) => <Timeframe {...matchProps}
                                                                                        parentState={this.state}
                                                                                        updateDash={this.updateDashTimeframe}/>}/>
                        <Route path="/geo" render={() => <Geo parentState={this.state}/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Route path="/facility" render={() => <PrintComponent/>}/>
                        <Route path="/mor" render={() => <MORComponent/>}/>
                        {/*<Route path="/facility" render={() => <Facility parentState={this.state}/>}/>*/}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>User Not Identified!</h2>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dash);