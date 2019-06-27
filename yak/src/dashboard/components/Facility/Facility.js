import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '../../tools/Card/Card';
// import Card from '@material-ui/core/Card';
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
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';


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
    greenText: {
        color: '#4caf50',
    },
    redText: {
        color: '#f44336',
    },
};

// Return positive monthly goal
function GreenGoal(props) {
    // Math for percentage over/under
    let diff = Math.abs(props.goal - props.actual);
    let percent = "NA";
    if (props.goal !== 0) {
        percent = ((diff / props.goal) * 100).toFixed(1);
    }
    return (
        <span>
            <MaterialIcon icon='trending_up' color='#4caf50'/>
                <span className="iconText">
                    <span style={{color: '#4caf50'}}> {percent}%</span> ({props.actual})
                </span>
        </span>
    );
}

// Return negative monthly goal
function RedGoal(props) {
    // Math for percentage over/under
    let diff = Math.abs(props.goal - props.actual);
    let percent = ((diff / props.goal) * 100).toFixed(1);
    return (
        <span>
            <MaterialIcon icon='trending_down' color='#f44336'/>
                <span className="iconText">
                    <span style={{color: '#f44336'}}> -{percent}%</span> ({props.actual})
                </span>
        </span>
    );
}

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
        fLogo: '',
        fType: 'Inpatient',
        fLoc: 'location',
        fDomain: this.props.parentState.SelectedFacilityDomain || 'domain',
        fAddress: 'Facility Address',
        fPhone: 'Facility Phone',
        fStyle: '',
        commentHighlights: '',
        commentWebUpdates: '',
        commentBranding: '',
        commentEmail: '',
        commentCollateral: '',
        commentGlobalUpdates: '',
        commentDigitalAd: '',
        commentTraditionalAd: '',
        cpaCommentBox: '',
        month: moment(this.props.parentState.DateFrame.To).format('MMMM YYYY'),
        momLabel: moment(this.props.parentState.DateFrame.To).format('MMM \'YY') + ' / ' + moment(this.props.parentState.DateFrame.To).add(-1, 'M').format('MMM \'YY'),
        monthCurrent: moment(this.props.parentState.DateFrame.To).format('MMM \'YY'),
        monthPreviousYear: moment(this.props.parentState.DateFrame.To).add(-1, 'y').format('MMM \'YY'),
        goalSpend: 0,
        goalTraffic: 0,
        goalWebforms: 0,
        goalCalls: 0,
        goalInquiries: 0,
        goalAdmits: 0,
        goalCPA: 0,
        goalCVR: 0,
    };

    componentWillMount() {
        // Use default Acadia logo & styles for combined buckets; just update document title
        if (this.state.fName.includes('All')) {
            this.setState({
                fLogo: 'https://s3.amazonaws.com/acadia-yak/facility_logos/Acadia-logo.png',
                fStyle: 'defaultAcadia',
            });
            document.title = "YAK - " + this.state.fName;
        }
        // Check for facility then create logo url string to show logo and select style scheme
        else if (this.state.fDomain !== 'domain') {
            this.setState({
                fLogo: logoURL + this.props.parentState.SelectedFacilityDomain + "-logo.png",
                // Set facility css rel; stripping out www. and .com
                fStyle: this.state.fDomain.replace(/(www\.)/, '').replace(/(\.com)/, ''),
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

    pxToMm = (px) => {
        return Math.floor(px / document.getElementById('captureArea').offsetHeight);
    };

    mmToPx = (mm) => {
        return document.getElementById('captureArea').offsetHeight * mm;
    };

    range = (start, end) => {
        return Array(end - start).join(0).split(0).map(function (val, id) {
            return id + start
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div id='captureArea' className='facilityComponent' rel={this.state.fStyle}>

                <div className="row" style={{display: 'inline-flex', width: '90%', marginBottom: '10px'}}>
                    <Card className='facilityProfileCard' style={{width: '30%'}}>
                        <CardMedia
                            component="img"
                            alt="Facility Logo"
                            style={{width: "80%", margin: 'auto'}}
                            height="auto"
                            image={this.state.fLogo}
                        />
                        <CardContent style={{padding: '8px'}}>
                            <h5><strong>Monthly Report:</strong></h5>
                            <span id='monthText'>
                                <strong>{this.state.month}</strong>
                            </span>
                            <h6>Facility:</h6>
                            <a href={"https://" + this.props.parentState.SelectedFacilityDomain} target="_blank" style={{textDecoration: "none"}}>
                                <span id='facilityNameText'>
                                    {this.props.parentState.SelectedFacility[0]}
                                </span>
                            </a>
                        </CardContent>
                    </Card>

                    <div style={{width: '100%', margin: 'auto'}}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Highlights"
                            multiline
                            rows="10"
                            rowsMax="12"
                            value={this.state.commentHighlights}
                            onChange={this.handleChange('commentHighlights')}
                            margin="normal"
                            variant="outlined"
                            style={{width: '90%', overflowX: 'hidden'}}
                        />
                    </div>
                </div>

                <Card id="statsSummary" className="customCard">
                    <CardHeader className="facilityCardHeader" color="prime">
                        <h4 className="cardTitleWhite">Stats Summary</h4>
                    </CardHeader>
                    <CardBody style={{display: 'inline-flex'}}>
                        <Table className={classes.table} style={{width: '60%'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center">{this.state.momLabel}</TableCell>
                                    <TableCell align="center">YTD / PYTD</TableCell>
                                    <TableCell
                                        align="center">{this.state.monthCurrent} / {this.state.monthPreviousYear}</TableCell>
                                    <TableCell align="center">Monthly Goal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key='spend'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        Spend
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalSpend"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalSpend')}
                                        />
                                        {this.state.goalSpend <= 184 ?
                                            <GreenGoal goal={this.state.goalSpend} actual={184}/>
                                            : <RedGoal goal={this.state.goalSpend} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow key='traffic'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        Traffic
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalTraffic"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalTraffic')}
                                        />
                                        {this.state.goalTraffic <= 184 ?
                                            <GreenGoal goal={this.state.goalTraffic} actual={184}/>
                                            : <RedGoal goal={this.state.goalTraffic} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow key='webforms'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        Webforms
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalWebforms"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalWebforms')}
                                        />
                                        {this.state.goalWebforms <= 184 ?
                                            <GreenGoal goal={this.state.goalWebforms} actual={184}/>
                                            : <RedGoal goal={this.state.goalWebforms} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow key='calls'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        Calls
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalCalls"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalCalls')}
                                        />
                                        {this.state.goalCalls <= 184 ?
                                            <GreenGoal goal={this.state.goalCalls} actual={184}/>
                                            : <RedGoal goal={this.state.goalCalls} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow key='inquiries'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        Inquiries
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalInquiries"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalInquiries')}
                                        />
                                        {this.state.goalInquiries <= 184 ?
                                            <GreenGoal goal={this.state.goalInquiries} actual={184}/>
                                            : <RedGoal goal={this.state.goalInquiries} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow key='admits'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        Admits
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalAdmits"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalAdmits')}
                                        />
                                        {this.state.goalAdmits <= 184 ?
                                            <GreenGoal goal={this.state.goalAdmits} actual={184}/>
                                            : <RedGoal goal={this.state.goalAdmits} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow key='cpa'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        CPA - Admits
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalCPA"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalCPA')}
                                        />
                                        {this.state.goalCPA <= 184 ?
                                            <GreenGoal goal={this.state.goalCPA} actual={184}/>
                                            : <RedGoal goal={this.state.goalCPA} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow key='cvr'>
                                    <TableCell component="th" scope="row" className="tableRowHeader">
                                        CVR - Admits
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            id="goalCVR"
                                            placeholder="goal"
                                            className="monthlyInput"
                                            margin="none"
                                            onChange={this.handleChange('goalCVR')}
                                        />
                                        {this.state.goalCVR <= 184 ?
                                            <GreenGoal goal={this.state.goalCVR} actual={184}/>
                                            : <RedGoal goal={this.state.goalCVR} actual={184}/>
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Table className={classes.table} style={{width: '40%', borderLeft: '2px solid #222'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Non-Data Highlights</TableCell>
                                    <TableCell align="center">Comments</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key='websiteUpdates'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='important_devices' color='#03B5E2'/>
                                        <span className="iconText"> Website Updates</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.commentWebUpdates}
                                            onChange={this.handleChange('commentWebUpdates')}
                                            className="facilityStatsInput"
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='branding'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='security' color='#03B5E2'/>
                                        <span className="iconText"> Branding</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.commentBranding}
                                            onChange={this.handleChange('commentBranding')}
                                            className="facilityStatsInput"
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='emailMarketing'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='alternate_email' color='#03B5E2'/>
                                        <span className="iconText"> Email Marketing</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.commentEmail}
                                            onChange={this.handleChange('commentEmail')}
                                            className="facilityStatsInput"
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='collateral'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='description' color='#03B5E2'/>
                                        <span className="iconText"> Collateral</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.commentCollateral}
                                            onChange={this.handleChange('commentCollateral')}
                                            className="facilityStatsInput"
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='globalUpdates'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='cloud_done' color='#03B5E2'/>
                                        <span className="iconText"> Global Updates</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.commentGlobalUpdates}
                                            onChange={this.handleChange('commentGlobalUpdates')}
                                            className="facilityStatsInput"
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='digitalAd'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='play_circle_filled' color='#03B5E2'/>
                                        <span className="iconText"> Digital Ad</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.commentDigitalAd}
                                            onChange={this.handleChange('commentDigitalAd')}
                                            className="facilityStatsInput"
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='traditionalAd'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='list_alt' color='#03B5E2'/>
                                        <span className="iconText"> Traditional Ad</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.commentTraditionalAd}
                                            onChange={this.handleChange('commentTraditionalAd')}
                                            className="facilityStatsInput"
                                            margin="normal"
                                            variant="outlined"
                                            style={{minWidth: '100%'}}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key='nonDataPoint'>
                                    <TableCell component="th" scope="row" className="StatsSummary-NonDataHead">
                                        <MaterialIcon icon='flag' color='#03B5E2'/>
                                        <span className="iconText"> Non-Data Point</span>
                                    </TableCell>
                                    <TableCell className="StatsSummary-NonDataCell">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label=""
                                            multiline
                                            rows="1"
                                            rowsMax="4"
                                            value={this.state.cpaCommentBox}
                                            onChange={this.handleChange('cpaCommentBox')}
                                            className="facilityStatsInput"
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

                <hr className="hidePrint" style={{width: '90%'}}/>
                <FacilityVolume parentState={this.state} logo={this.state.fLogo}/>
                <hr style={{width: '90%'}}/>

                Sample Form
                <FacilityFormStepper/>

                <ExpansionPanel style={{width: '90%', display: 'inline-block', background: 'none', boxShadow: 'none'}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
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