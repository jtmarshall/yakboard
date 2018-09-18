import React from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import MaterialIcon from "material-icons-react";
import Button from "@material-ui/core/Button/Button";
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';


class DatePicker extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        top: false
    };

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

    // Compare dates update for when month over month, w/w, etc. is selected
    updateCompareToDate = (val) => {
        let dateFrame = {
            From: this.props.dateFrame.From,
            To: this.props.dateFrame.To,
            CompareFrom: this.props.dateFrame.CompareFrom,
            CompareTo: val
        };

        // Check if input To date is before current From date; adjust From date (-1) if so
        if (val < this.props.dateFrame.CompareFrom) {
            dateFrame.CompareFrom = moment(val).subtract(1, 'days').format('YYYY-MM-DD');
        }

        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    updateCompareFromDate = (val) => {
        let dateFrame = {
            From: this.props.dateFrame.From,
            To: this.props.dateFrame.To,
            CompareFrom: val,
            CompareTo: this.props.dateFrame.CompareTo
        };

        // Check if input From date is after current To date; adjust To date (+1) if so
        if (val > this.props.dateFrame.CompareTo) {
            dateFrame.CompareTo = moment(val).add(1, 'days').format('YYYY-MM-DD');
        }

        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        return (
            <form className="col-lg-4 datePicker">
                <TextField
                    required={true}
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
                    required={true}
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
                <Tooltip title="Compare Dates" placement="bottom">
                    <Button onClick={this.toggleDrawer('top', true)} style={{top: '5px'}}>
                        <MaterialIcon icon='compare_arrows' size={18} color=''/>
                    </Button>
                </Tooltip>

                <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
                    <div
                        style={{padding: 20, textAlign: 'center'}}
                        tabIndex={0}
                        role="button"
                    >
                        <div className="col-lg-12">
                            <TextField
                                required={true}
                                id="dateCompareFrom"
                                label="CompareFrom"
                                type="date"
                                value={this.props.dateFrame.CompareFrom}
                                onChange={(e) => this.updateCompareFromDate(e.target.value)}
                                className="datePicker-textField"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                required={true}
                                id="dateCompareTo"
                                label="CompareTo"
                                type="date"
                                value={this.props.dateFrame.CompareTo}
                                onChange={(e) => this.updateCompareToDate(e.target.value)}
                                className="datePicker-textField"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button variant="contained" color="primary" style={{backgroundColor: '#00C853', color: '#ffffff'}} className="">
                                Apply
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </form>
        );
    }
}

export default DatePicker;