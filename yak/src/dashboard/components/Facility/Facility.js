import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import ParentRow from "./ParentRow";


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

        if (this.props.SelectedFacility.length > 1) {
            alert('This page can show only one facility report at a time. \n Remove the extras and reload the page.');
        }
    }

    state = {
        fName: this.props.SelectedFacility[0] || 'Acadia Facility',
        fLogo: '',
        fType: 'Inpatient',
        fLoc: 'location',
        fDomain: this.props.SelectedFacilityDomain || 'domain',
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
        month: moment(this.props.DateFrame.To).format('MMMM YYYY'),
        momLabel: moment(this.props.DateFrame.To).format('MMM \'YY') + ' / ' + moment(this.props.DateFrame.To).add(-1, 'M').format('MMM \'YY'),
        monthCurrent: moment(this.props.DateFrame.To).format('MMM \'YY'),
        monthPreviousYear: moment(this.props.DateFrame.To).add(-1, 'y').format('MMM \'YY'),
        goalWebforms: 0,
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
                fLogo: logoURL + this.props.SelectedFacilityDomain + "-logo.png",
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
                            style={{width: "75%", margin: 'auto'}}
                            height="auto"
                            image={this.state.fLogo}
                        />
                        <CardContent style={{padding: '8px'}}>
                            <h5><strong>Monthly Report:</strong></h5>
                            <span id='monthText'>
                                <strong>{this.state.month}</strong>
                            </span>
                            <h6>Facility:</h6>
                            <a
                                href={"https://" + this.props.SelectedFacilityDomain}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{textDecoration: "none"}}
                            >
                                <span id='facilityNameText'>
                                    {this.props.SelectedFacility[0]}
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
                    <CardBody>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className='tableColHeadRow'>
                                    <TableCell></TableCell>
                                    <TableCell>{this.state.momLabel}</TableCell>
                                    <TableCell>YTD / PYTD</TableCell>
                                    <TableCell>{this.state.monthCurrent} / {this.state.monthPreviousYear}</TableCell>
                                    <TableCell>Monthly Goal</TableCell>
                                </TableRow>
                            </TableHead>
                            <ParentRow fieldName='Spend' />
                            <ParentRow fieldName='Traffic' />
                            <ParentRow fieldName='Calls' />
                            <ParentRow fieldName='Inquiries' />
                            <ParentRow fieldName='Admits' />
                            <TableBody>
                                <TableRow key='webforms' className='tableDataRow'>
                                    <TableCell component="th" className="tableRowHeader">Webforms</TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
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

                                <TableRow key='cpa' className='tableDataRow'>
                                    <TableCell component="th" className="tableRowHeader">CPA - Admits</TableCell>
                                    <TableCell >
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
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

                                <TableRow key='cvr' className='tableDataRow'>
                                    <TableCell component="th" className="tableRowHeader">CVR - Admits</TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_up' color='#4caf50'/>
                                        <span className="iconText">
                                            <span className={classes.greenText}> 6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <MaterialIcon icon='trending_down' color='#f44336'/>
                                        <span className="iconText">
                                            <span className={classes.redText}> -6%</span> (184)
                                        </span>
                                    </TableCell>
                                    <TableCell>
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

                        <Table className={classes.table} style={{marginTop: '40px'}}>
                            <TableHead>
                                <TableRow className='tableColHeadRow'>
                                    <TableCell>Non-Data Highlights</TableCell>
                                    <TableCell>Comments</TableCell>
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
)(withStyles(styles)(Facility));