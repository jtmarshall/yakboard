import React from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';


class DatePicker extends React.Component {

    constructor(props) {
        super(props);
    }

    // Updates the selected facility list
    updateToDate = (val) => {
        let dateFrame = {
            From: this.props.dateFrame.From,
            To: val
        };

        // Check if input To date is before current From date; adjust From date (-1) if so
        if (val < this.props.dateFrame.From) {
            dateFrame.From = moment(val).subtract(1, 'days').format('YYYY-MM-DD');
        }

        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    // Updates the selected facility list
    updateFromDate = (val) => {
        let dateFrame = {
            From: val,
            To: this.props.dateFrame.To
        };

        // Check if input From date is after current To date; adjust To date (+1) if so
        if (val > this.props.dateFrame.To) {
            dateFrame.To = moment(val).add(1, 'days').format('YYYY-MM-DD');
        }

        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    render() {
        return (
            <form className="col-lg-4 datePicker">
                <TextField
                    id="dateFrom"
                    label="From"
                    type="date"
                    value={this.props.dateFrame.From}
                    onChange={(e) => this.updateFromDate(e.target.value)}
                    className="datePicker-textField"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="dateTo"
                    label="To"
                    type="date"
                    value={this.props.dateFrame.To}
                    onChange={(e) => this.updateToDate(e.target.value)}
                    className="datePicker-textField"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }

}

export default DatePicker;