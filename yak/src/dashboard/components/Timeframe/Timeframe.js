import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ETimeframeChart from './eTimeframeChart';


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * Displays graph for touches and conversions in selected dateframe for selected facilities.
 * Will grab selection from parent state and execute api call.
 * The route can be appended with a term "lastWeek"/"lastMonth" to preload a timeframe automatically.
 */
class Timeframe extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            secondaryDateCheck: this.props.parentState.SecondaryDateCheck,
            tabValue: this.props.parentState.Timeframe.tabValue,
            timeFrame: this.props.match.params.id,
        };

        console.log("construct: ", this.props.match.params.id);
    }

    render() {
        return (
            <div className="conversionComponent">
                <h3>Timeframe</h3>
                <ETimeframeChart
                    id='eTimeframeChart'
                    timeFrame={this.props.match.params.id}
                    date={this.props.parentState.DateFrame}
                    secondaryDateCheck={this.state.secondaryDateCheck}
                />
            </div>
        )
    }
}

export default Timeframe;