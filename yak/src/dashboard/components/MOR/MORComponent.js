import React, {Component} from 'react';
import {connect} from 'react-redux';
import './morStyles.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import MaterialIcon from "material-icons-react";
import moment from 'moment';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from '@material-ui/core/Paper';


const styles = {
    morCard: {
        maxWidth: '600px',
        background: 'none !important',
        boxShadow: 'none !important',
    },
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

const headers = ["Actual", "Budget", "Bud Var", "Bud Var%", "Prior Year", "PY Var", "PY Var%"];
function createData(name, actual, budget, budVar, budVarPercent, priorYear, pyVar, pyVarPercent) {
    return { name, actual, budget, budVar, budVarPercent, priorYear, pyVar, pyVarPercent };
}

// const rows = [
//     {
//         name: 'Revenues & Adjustments',
//         data: createData('Revenues & Adjustments', 545638585, 551843118, 6204534, 1.1, 472159953, 73478632, 15.6),
//         parentID: 0,
//     },
//     {
//         name: 'IP Gross Revenue',
//         data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
//         childID: 0,
//     },
//     {
//         name: 'IP Contractual Deductions',
//         data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
//         childID: 0,
//     },
//     {
//         name: 'IP Rev Deducts - Admin',
//         data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
//         childID: 0,
//     },
//     {
//         name: 'IP Rev Deducts - Charity',
//         data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
//         childID: 0,
//     },
//     {
//         name: 'IP Rev Deducts - Denials',
//         data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
//         childID: 0,
//     }
// ];

const rows = [
    {
        name: 'Revenues & Adjustments',
        data: createData('Revenues & Adjustments', 545638585, 551843118, 6204534, 1.1, 472159953, 73478632, 15.6),
        subData: [
            {
                name: 'IP Gross Revenue',
                data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
            },
            {
                name: 'IP Contractual Deductions',
                data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
            },
            {
                name: 'IP Rev Deducts - Admin',
                data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
            },
            {
                name: 'IP Rev Deducts - Charity',
                data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
            },
            {
                name: 'IP Rev Deducts - Denials',
                data: createData('IP Gross Revenue', 291402343, 293788837, 2386494, 0.8, 227084744, 64317599, 28.3),
            }
        ],
    },
];

// Return positive goal
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

// Return negative goal
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

function TabContainer(props) {
    return (
        <div className="tabContainer" style={{padding: 8 * 3}}>
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const logoURL = "https://s3.amazonaws.com/acadia-yak/facility_logos/";

class MORComponent extends Component {

    state = {
        tabValue: 1,
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
                fLogo: logoURL + this.props.SelectedFacilityDomain + "-logo.png",
                // Set facility css rel; stripping out www. and .com
                fStyle: this.state.fDomain.replace(/(www\.)/, '').replace(/(\.com)/, ''),
            });
            document.title = "YAK - " + this.state.fName;
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleTabChange = (event, tabValue) => {
        this.setState({tabValue});
    };

    toggleChildRows = () => {

    };

    render() {
        const {classes} = this.props;
        const {tabValue} = this.state;

        return (
            <div id='captureArea' className='facilityComponent' rel={this.state.fStyle}>
                <h3>MOR</h3>

                <Tabs
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                    style={{display: 'inline-block'}}
                >
                    <Tab label="Periodic"/>
                    <Tab label="Year to Date"/>
                </Tabs>

                <div className="row" style={{marginBottom: '10px'}}>
                    <Card className={classes.morCard} style={{display: 'flex', margin: 'auto'}}>
                        <CardMedia
                            component="img"
                            alt="Facility Logo"
                            style={{width: "300px", margin: 'auto'}}
                            height="auto"
                            image={this.state.fLogo}
                        />
                        <div style={{display: 'flex', margin: 'auto'}}>
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
                        </div>
                    </Card>
                </div>

                {tabValue === 0 && <TabContainer>
                    <Card id="statsSummary" className="customCard">
                        <CardHeader className="facilityCardHeader" color="prime">
                            <h4 className="cardTitleWhite">Stats Summary</h4>
                        </CardHeader>
                        <CardContent>
                            <Table className={classes.table}>
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
                        </CardContent>
                    </Card>
                </TabContainer>}

                {tabValue === 1 && <TabContainer>
                    <Paper className={classes.paper}>
                        <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                            <TableCell>#</TableCell>
                            {headers.map(header => (
                                <TableCell align="right">{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map(row => (
                            <TableRow key={row.name} className={(row.childID >= 0 ? "childRow" : "")} value={row.childID}>
                                <TableCell component="th" scope="row">
                                {row.parentID >= 0 ?
                                    <span onClick={this.toggleChildRows(row.parentID)}>
                                        {row.name}
                                    </span>
                                    : <span>{row.name}</span>
                                }
                                </TableCell>
                                <TableCell align="right">{row.data.actual}</TableCell>
                                <TableCell align="right">{row.data.budget}</TableCell>
                                <TableCell align="right">{row.data.budVar}</TableCell>
                                <TableCell align="right">{row.data.budVarPercent}</TableCell>
                                <TableCell align="right">{row.data.priorYear}</TableCell>
                                <TableCell align="right">{row.data.pyVar}</TableCell>
                                <TableCell align="right">{row.data.pyVarPercent}</TableCell>
                            </TableRow>
                            ))} */}
                            {rows.map(row => [(
                            <TableRow key={row.name} className={(row.childID >= 0 ? "childRow" : "")}>
                                <TableCell component="th" scope="row">
                                    <span onClick={this.toggleChildRows(row.name)}>{row.name}</span>
                                </TableCell>
                                <TableCell align="right">{row.data.actual}</TableCell>
                                <TableCell align="right">{row.data.budget}</TableCell>
                                <TableCell align="right">{row.data.budVar}</TableCell>
                                <TableCell align="right">{row.data.budVarPercent}</TableCell>
                                <TableCell align="right">{row.data.priorYear}</TableCell>
                                <TableCell align="right">{row.data.pyVar}</TableCell>
                                <TableCell align="right">{row.data.pyVarPercent}</TableCell>
                            </TableRow>
                            ), (row.subData.map(subRow => (
                                <TableRow key={subRow.name} className={"childRow"} value={row.name}>
                                    <TableCell component="th" scope="row">
                                    {subRow.name}
                                    </TableCell>
                                    <TableCell align="right">{subRow.data.actual}</TableCell>
                                    <TableCell align="right">{subRow.data.budget}</TableCell>
                                    <TableCell align="right">{subRow.data.budVar}</TableCell>
                                    <TableCell align="right">{subRow.data.budVarPercent}</TableCell>
                                    <TableCell align="right">{subRow.data.priorYear}</TableCell>
                                    <TableCell align="right">{subRow.data.pyVar}</TableCell>
                                    <TableCell align="right">{subRow.data.pyVarPercent}</TableCell>
                                </TableRow>)))
                            ])}
                        </TableBody>
                        </Table>
                    </Paper>
                </TabContainer>}                                
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

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(console.log(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MORComponent));