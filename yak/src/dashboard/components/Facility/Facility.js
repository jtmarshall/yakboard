import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '../../tools/Card/Card';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from '../../tools/Card/CardBody';
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import MaterialIcon from 'material-icons-react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FacilityVolume from './FacilityVolume';
import FacilityFormStepper from './facilityForm';
import moment from 'moment';


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    cardConversionGraph: {
        width: '90%',
        margin: '0 6px',
    },
    cardConversionTable: {
        overflowX: 'auto',
    },
};

const logoURL = "https://s3.amazonaws.com/acadia-yak/facility_logos/";

class Facility extends Component {
    constructor(props) {
        super(props);

        if (this.props.parentState.SelectedFacility.length > 1) {
            alert('This page can show only one facility report at a time. \n Remove the extras and reload the page.');
        }
    }

    state = {
        fName: this.props.parentState.SelectedFacility[0] || 'Acadia Facility',
        fLogo: 'LOGO HERE',
        fType: 'Inpatient',
        fLoc: 'location',
        fDomain: this.props.parentState.SelectedFacilityDomain || 'domain',
        commentBox: '',
        spendCommentBox: '',
        webformsCommentBox: '',
        admitsCommentBox: '',
        inquiriesCommentBox: '',
        callsCommentBox: '',
        trafficCommentBox: '',
        cpaCommentBox: '',
        momLabel: moment(this.props.parentState.DateFrame.To).format('MMM \'YY') +'/'+ moment(this.props.parentState.DateFrame.To).add(-1, 'M').format('MMM \'YY'),
        ytd: moment(this.props.parentState.DateFrame.To).format('MMM YYYY'),
        ytdPrevious: moment(this.props.parentState.DateFrame.To).add(-1, 'y').format('MMM YYYY'),
    };

    componentDidMount() {
        // Check if we have a facility then create logo url string to show logo
        if(this.state.fDomain !== 'domain') {
            this.setState({
                fLogo: logoURL + this.props.parentState.SelectedFacilityDomain + "-logo.png",
            });

            document.title = "YAK - " + this.state.fName;
        }
    }

    // Load selected facility into view
    loadFacility = (facility) => {
        this.setState({
            fName: '',
            fLogo: '',
            fType: '',
            fLoc: '',
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    printReport = () => {
        alert("Printing PDF Report");
    };

    render() {
        const {classes} = this.props;
        // Concatenate logo url together
        const fLogo = logoURL + this.props.parentState.SelectedFacilityDomain + "-logo.png";

        return (
            <div className="facilityComponent">
                <span style={{position: 'absolute', right: '5%', cursor: 'pointer'}} onClick={this.printReport}>
                    <MaterialIcon icon='print' color='#4caf50'/>
                    <span style={{fontSize: '16px', verticalAlign: 'top'}}> Print Report</span>
                </span>

                <h3>Facility Report - {this.props.parentState.SelectedFacility[0]}</h3>


                <div className="row" style={{display: 'inline-flex', width: '90%'}}>
                    <div style={{width: '40%', margin: 'auto'}}>
                        <img src={fLogo} style={{width: '50%'}} alt="logo"/>
                        <h3><b><em>Summary</em></b></h3>
                    </div>
                    <div style={{width: '55%', margin: 'auto'}}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Comments"
                            multiline
                            rows="8"
                            rowsMax="12"
                            value={this.state.commentBox}
                            onChange={this.handleChange('commentBox')}
                            margin="normal"
                            variant="outlined"
                            style={{minWidth: '80%', marginTop: '25px', overflowX: 'hidden'}}
                        />
                    </div>
                </div>

                <Card>
                    <CardHeader color="prime">
                        <h4 className="cardTitleWhite">Stats Summary</h4>
                    </CardHeader>
                    <CardBody>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center">MoM {this.state.momLabel}</TableCell>
                                    <TableCell align="center">YTD {this.state.ytd}</TableCell>
                                    <TableCell align="center">YTD {this.state.ytdPrevious}</TableCell>
                                    <TableCell align="center">Comments</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key='spend'>
                                    <TableCell component="th" scope="row">
                                        Spend
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.spendCommentBox}
                                            onChange={this.handleChange('spendCommentBox')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='webforms'>
                                    <TableCell component="th" scope="row">
                                        Webforms
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.webformsCommentBox}
                                            onChange={this.handleChange('webformsCommentBox')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='admits'>
                                    <TableCell component="th" scope="row">
                                        Admits
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.admitsCommentBox}
                                            onChange={this.handleChange('admitsCommentBox')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='inquiries'>
                                    <TableCell component="th" scope="row">
                                        Inquiries
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.inquiriesCommentBox}
                                            onChange={this.handleChange('inquiriesCommentBox')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='calls'>
                                    <TableCell component="th" scope="row">
                                        Calls
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.callsCommentBox}
                                            onChange={this.handleChange('callsCommentBox')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='traffic'>
                                    <TableCell component="th" scope="row">
                                        Traffic
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.trafficCommentBox}
                                            onChange={this.handleChange('trafficCommentBox')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='cpa'>
                                    <TableCell component="th" scope="row">
                                        CPA
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_upward' color='#4caf50'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='arrow_downward' color='#f44336'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.cpaCommentBox}
                                            onChange={this.handleChange('cpaCommentBox')}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

                <FacilityFormStepper/>

                <hr style={{width: '90%'}}/>
                <FacilityVolume parentState={this.state} logo={fLogo}/>
                <hr style={{width: '90%'}}/>

                <ExpansionPanel style={{width: '90%', display: 'inline-block', background: 'none', boxShadow: 'none'}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Supporting Data</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        Dis is data.
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

export default withStyles(styles)(Facility);