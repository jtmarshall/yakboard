import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import MaterialIcon from "material-icons-react";
import Button from "@material-ui/core/Button/Button";
import Tooltip from '@material-ui/core/Tooltip';
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormGroup from '@material-ui/core/FormGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class DateComponent extends React.Component {

    state = {
        DateFrame: this.props.DateFrame,
        top: false,
        dateDenomination: 'custom',
        dateUnit: 'day',
        open: false,
    };

    handleCheckbox = event => {
        this.props.updateSecondary(event.target.checked);
    };

    // Updates the selected facility list
    updateToDate = (val) => {
        let dateFrame = {
            From: this.props.DateFrame.From,
            To: val
        };

        // Check if input To date is before current From date; adjust From date (-1) if so
        if (val < this.props.DateFrame.From) {
            dateFrame.From = moment(val).subtract(1, 'days').format('YYYY-MM-DD');
        }

        this.setState({
            dateDenomination: 'custom',
        });
        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    // Updates the selected facility list
    updateFromDate = (val) => {
        let dateFrame = {
            From: val,
            To: this.props.DateFrame.To
        };

        // Check if input From date is after current To date; adjust To date (+1) if so
        if (val > this.props.DateFrame.To) {
            dateFrame.To = moment(val).add(1, 'days').format('YYYY-MM-DD');
        }

        this.setState({
            dateDenomination: 'custom',
        });
        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    // Compare dates update for when month over month, w/w, etc. is selected
    updateCompareToDate = (val) => {
        let dateFrame = {
            From: this.props.DateFrame.From,
            To: this.props.DateFrame.To,
            CompareFrom: this.props.DateFrame.CompareFrom,
            CompareTo: val
        };

        // Check if input To date is before current From date; adjust From date (-1) if so
        if (val < this.props.DateFrame.CompareFrom) {
            dateFrame.CompareFrom = moment(val).subtract(1, 'days').format('YYYY-MM-DD');
        }

        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    updateCompareFromDate = (val) => {
        let dateFrame = {
            From: this.props.DateFrame.From,
            To: this.props.DateFrame.To,
            CompareFrom: val,
            CompareTo: this.props.DateFrame.CompareTo
        };

        // Check if input From date is after current To date; adjust To date (+1) if so
        if (val > this.props.DateFrame.CompareTo) {
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

    // update date denomination
    handleDateDenominationSelect = name => event => {
        let dateDenom = event.target.value;

        this.setState({
            dateDenomination: dateDenom
        });

        // Initialize temp dates
        let tempTo;
        let tempFrom;

        // Set values for temp dates based on input
        switch (dateDenom) {
            case 'today':
                tempTo = moment();
                tempFrom = moment();
                break;
            case 'yesterday':
                tempTo = moment().subtract(1, 'days');
                tempFrom = moment().subtract(1, 'days');
                break;
            case 'lastWeek':
                tempTo = moment().subtract(1, 'weeks').endOf('week');
                tempFrom = moment().subtract(1, 'weeks').startOf('week');
                break;
            case 'lastMonth':
                tempTo = moment().subtract(1, 'months').endOf('month');
                tempFrom = moment().subtract(1, 'months').startOf('month');
                break;
            case 'last7':
                tempTo = moment();
                tempFrom = moment().subtract(7, 'days');
                break;
            case 'last30':
                tempTo = moment();
                tempFrom = moment().subtract(30, 'days');
                break;
            default:
                tempTo = moment(this.props.DateFrame.To);
                tempFrom = moment(this.props.DateFrame.From);

        }

        let dateFrame = {
            From: tempFrom.format('YYYY-MM-DD'),
            To: tempTo.format('YYYY-MM-DD'),
            CompareFrom: this.props.DateFrame.CompareFrom,
            CompareTo: this.props.DateFrame.CompareTo
        };

        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    handleDateUnit = name => event => {
        this.setState({
            dateUnit: event.target.value,
        });
    };

    // Remove comparison date range
    clearDates = () => {
        let dateFrame = {
            From: this.props.DateFrame.From,
            To: this.props.DateFrame.To,
            CompareFrom: '',
            CompareTo: ''
        };

        // Push update to Dash state
        this.props.onUpdate(dateFrame);
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <form className="datePicker">

                <Tooltip title="Select Dates" placement="bottom">
                    <Button onClick={this.handleClickOpen} style={{top: '5px'}}>
                        <MaterialIcon icon='date_range' size={26} color=''/>

                        {moment(this.props.DateFrame.From).format('l')} - {moment(this.props.DateFrame.To).format('l')}
                    </Button>
                </Tooltip>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    style={{paddingLeft: '180px', top: '-20%'}}
                >
                    <DialogTitle id="form-dialog-title" style={{background: "#EEE", textAlign: 'center'}}>
                        Date Options
                    </DialogTitle>

                    <DialogContent>
                        <FormGroup>
                            <FormGroup row style={{padding: '10px 5px', display: 'block', textAlign: 'center'}}>
                                <div style={{display: "inline-flex", width: "100%", marginBottom: "20px"}}>
                                    <FormControl style={{margin: 'auto'}}>
                                        <span style={{fontSize: '.8em', color: '#757575'}}>Presets</span>
                                        <Select
                                            className="skuFilterSelect"
                                            value={this.state.dateDenomination}
                                            onChange={this.handleDateDenominationSelect('dateDenomination')}
                                            inputProps={{
                                                name: 'dateDenomination',
                                                id: 'filterDateDenomination',
                                            }}
                                        >
                                            <MenuItem value={'custom'}>Custom</MenuItem>
                                            <MenuItem value={'today'}>Today</MenuItem>
                                            <MenuItem value={'yesterday'}>Yesterday</MenuItem>
                                            <MenuItem value={'lastWeek'}>Last Week</MenuItem>
                                            <MenuItem value={'lastMonth'}>Last Month</MenuItem>
                                            <MenuItem value={'last7'}>Last 7 Days</MenuItem>
                                            <MenuItem value={'last30'}>Last 30 Days</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{margin: 'auto'}}>
                                        <span style={{fontSize: '.8em', color: '#757575'}}>Date Unit</span>
                                        <Select
                                            className="skuFilterSelect"
                                            value={this.state.dateUnit}
                                            onChange={this.handleDateUnit('dateUnit')}
                                            inputProps={{
                                                name: 'dateUnit',
                                                id: 'filterDateUnit',
                                            }}
                                        >
                                            <MenuItem value={'day'}>Day</MenuItem>
                                            <MenuItem value={'week'}>Week</MenuItem>
                                            <MenuItem value={'month'}>Month</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <br/>

                                <Tooltip title="Primary Start Date" placement="bottom">
                                    <TextField
                                        required={true}
                                        id="dateFrom"
                                        label="From"
                                        type="date"
                                        value={this.props.DateFrame.From}
                                        onChange={(e) => this.updateFromDate(e.target.value)}
                                        className="datePicker-textField"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Primary End Date" placement="bottom">
                                    <TextField
                                        required={true}
                                        id="dateTo"
                                        label="To"
                                        type="date"
                                        value={this.props.DateFrame.To}
                                        onChange={(e) => this.updateToDate(e.target.value)}
                                        className="datePicker-textField"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Tooltip>
                            </FormGroup>

                            <span style={{margin: "auto", display: "inline-flex", fontSize: "13px", paddingTop: '20px'}}>
                                <input type="checkbox"
                                       style={{margin: "auto"}}
                                       checked={this.props.secondaryCheckbox}
                                       onChange={this.handleCheckbox}/> Use Secondary Date
                            </span>
                            <FormGroup row style={{margin: 'auto'}}>

                                <Tooltip title="Secondary Start Date" placement="bottom">
                                    <TextField
                                        disabled={!this.props.secondaryCheckbox}
                                        id="dateCompareFrom"
                                        label="SEC From"
                                        type="date"
                                        value={this.props.DateFrame.CompareFrom}
                                        onChange={(e) => this.updateCompareFromDate(e.target.value)}
                                        className="datePicker-textField"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Secondary End Date" placement="bottom">
                                    <TextField
                                        disabled={!this.props.secondaryCheckbox}
                                        id="dateCompareTo"
                                        label="SEC To"
                                        type="date"
                                        value={this.props.DateFrame.CompareTo}
                                        onChange={(e) => this.updateCompareToDate(e.target.value)}
                                        className="datePicker-textField"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Tooltip>
                            </FormGroup>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions style={{padding: '10px'}}>
                        <Button variant="contained" color="primary"
                                style={{backgroundColor: '#00C853', color: '#ffffff', marginRight: '10px'}}
                                onClick={() => {
                                    this.props.refreshView();
                                    this.handleClose();
                                }}
                        >
                            Apply
                        </Button>
                        <Button variant="contained" className="" onClick={this.clearDates}>
                            Clear
                        </Button>
                    </DialogActions>
                </Dialog>


            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        DateFrame: state.DateFrame,
        Filter: state.Filter,
        SelectedFacility: state.SelectedFacility.Facility,
        SelectedFacilityDomain: state.SelectedFacility.Domain,
    };
};

export default connect(
    mapStateToProps,
)(DateComponent);