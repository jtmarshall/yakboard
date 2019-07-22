import React, {Component} from 'react';
import {connect} from 'react-redux';
import './morStyles.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
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
function createData(name) {
    let sampleSet = [49908364, 43305935, 6602429, 4.7, 46829627, 3078737, 6.6];
    // randomize sample set
    sampleSet = sampleSet.map((element) => {
        return (element + (element * Math.floor(Math.random() * 5))).toFixed(1);
    });

    let data = {
        name: name,
        actual: sampleSet[0],
        budget: sampleSet[1],
        budVar: sampleSet[2],
        budVarPercent: sampleSet[3],
        priorYear: sampleSet[4],
        pyVar: sampleSet[5],
        pyVarPercent: sampleSet[6],
    };
    return data;
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

let rows = [
    {
        name: 'Revenues & Adjustments',
        data: [],
        toggleID: 'RevenuesAdjustments',
        subData: [
            {
                name: 'IP Gross Revenue',
                data: [],
            },
            {
                name: 'IP Contractual Deductions',
                data: [],
            },
            {
                name: 'IP Rev Deducts - Admin',
                data: [],
            },
            {
                name: 'IP Rev Deducts - Charity',
                data: [],
            },
            {
                name: 'IP Rev Deducts - Denials',
                data: [],
            }
        ],
    },
    {
        name: 'IP Net Revenue',
        data: [],
        toggleID: 'IPNetRevenue',
        subData: [
            {
                name: 'OP Gross Revenue',
                data: [],
            },
            {
                name: 'OP Contractual Deductions',
                data: [],
            },
            {
                name: 'OP Rev Deducts - Admin',
                data: [],
            },
            {
                name: 'OP Rev Deducts - Charity',
                data: [],
            },
            {
                name: 'OP Rev Deducts - Denials',
                data: [],
            }
        ],
    },
    {
        name: 'OP Net Revenue',
        data: [],
        toggleID: 'OPNetRevenue',
        subData: [
            {
                name: 'EAP Revenue',
                data: [],
            },
            {
                name: 'Management Contract Revenue',
                data: [],
            },
            {
                name: 'Non Operating Revenue',
                data: [],
            }
        ],
    },
    {
        name: 'Net Revenue before Bad Debt Provision',
        data: [],
        toggleID: 'NetRevenuebeforeBadDebtProvision',
        subData: [
            {
                name: 'Bad Debt Expense',
                data: [],
            }
        ],
    },
    {
        name: 'Net Revenue',
        data: [],
    },
    {
        name: 'Operating Expenses',
        data: [],
        toggleID: 'OperatingExpenses',
        subData: [
            {
                name: 'Salary Expense less Incentive Comp',
                data: [],
            },
            {
                name: 'Incentive Comp',
                data: [],
            },
            {
                name: 'Total Benefits Expense',
                data: [],
            },
            {
                name: 'Contract Labor',
                data: [],
            },
            {
                name: 'Purchase Svcs',
                data: [],
            },
            {
                name: 'Professional Fees',
                data: [],
            },
            {
                name: 'Supplies',
                data: [],
            },
            {
                name: 'Utilities',
                data: [],
            },
            {
                name: 'Repairs and Maintenance',
                data: [],
            },
            {
                name: 'Rent/Lease Exp less Interco Rent',
                data: [],
            },
            {
                name: 'Insurance Expense',
                data: [],
            },
            {
                name: 'Marketing Exp',
                data: [],
            },
            {
                name: 'Enterprise Growth',
                data: [],
            },
            {
                name: 'Total Outside Provider Expense',
                data: [],
            },
            {
                name: 'Other Operating Expense',
                data: [],
            },
        ],
    },
    {
        name: 'Total Operating Expenses',
        data: [],
    },
    {
        name: 'EBITDA',
        data: [],
    },
    {
        name: 'EBITDA % of Net Revenue Non-Operating Expenses',
        data: [],
        toggleID: 'EBITDA%ofNetRevenueNon-OperatingExpenses',
        subData: [
            {
                name: 'Depreciation and Amortization',
                data: [],
            },
            {
                name: 'Interest Exp less Interco Interest',
                data: [],
            },
            {
                name: 'Intercompany Interest',
                data: [],
            },
            {
                name: 'Mgmt Fees',
                data: [],
            },
            {
                name: 'Non Operating Other Exp',
                data: [],
            }
        ],
    },
    {
        name: 'Total Non Operating Expenses',
        data: [],
    },
    {
        name: 'Pretax Income',
        data: [],
    },
    {
        name: 'Net Income from Operations',
        data: [],
    },
    {
        name: 'Net Income',
        data: [],
    },
    {
        name: 'Net Income Attributable to Acadia',
        data: [],
    },
    {
        name: 'Avg Net Revenue per Patient Day',
        data: [],
        toggleID: 'AvgNetRevenueperPatientDay',
        subData: [
            {
                name: 'Inpatient Net Revenue per Patient Day',
                data: [],
            },
            {
                name: 'Net Revenue per Patient Day',
                data: [],
            },
            {
                name: 'Net Rev per Equiv Patient Day',
                data: [],
            },
            {
                name: 'Total Expense per Patient Day',
                data: [],
            },
            {
                name: 'Oper Exp per Equiv Patient Day',
                data: [],
            }
        ],
    },
    {
        name: 'Cash Collections',
        data: [],
    },
    {
        name: 'Collections % of Revenue After Bad Debt',
        data: [],
    },
];

// Fills table row data
let fillData = (rows) => {
    console.log(rows.length);
    for (let row in rows) {
        rows[row].data = createData(rows[row].name);

        // Fill sub-row data if exists
        if (rows[row].subData) {
            for (let subRow in rows[row].subData) {
                rows[row].subData[subRow].data = createData(rows[row].subData[subRow].name);
            }
        }
    }
};

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
        // Load table rows Data
        fillData(rows);

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

    // Show/hide child rows
    toggleChildRows = (name) => {
        let x = document.getElementsByClassName(name);
        if (x[0].style.display === 'none') {
            for (let i = 0; i < x.length; i++) {
                x[i].style.display = 'table-row';
            }
        } else {
            for (let i = 0; i < x.length; i++) {
                x[i].style.display = 'none';
            }
        }
    };

    render() {
        const {classes} = this.props;
        const {tabValue} = this.state;

        return (
            <div id='captureArea' className='facilityComponent' rel={this.state.fStyle}>
                <h3>MOR</h3>

                <div className="row">
                    <Card className={classes.morCard} style={{display: 'flex', margin: 'auto'}}>
                        <CardMedia
                            component="img"
                            alt="Facility Logo"
                            style={{maxWidth: "240px", margin: 'auto'}}
                            height="auto"
                            image={this.state.fLogo}
                        />
                        <div style={{display: 'flex', margin: 'auto'}}>
                            <CardContent style={{padding: '8px'}}>
                                <h5><strong>MOR:</strong></h5>
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
                <TabContainer>
                    <Paper className={classes.paper}>
                        <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow className="facilityCardHeader">
                                <TableCell colSpan={Math.floor(headers.length)} style={{textAlign: 'center', color: '#fff'}}>Periodic</TableCell>
                                <TableCell></TableCell>
                                <TableCell colSpan={Math.floor(headers.length)} style={{textAlign: 'center', color: '#fff'}}>Year to Date</TableCell>
                            </TableRow>
                            <TableRow>
                                {headers.map(header => (
                                    <TableCell key={header} className='colHead' style={{textAlign: 'center'}}>{header}</TableCell>
                                ))}
                                <TableCell className='colHead'></TableCell>
                                {headers.map(header => (
                                    <TableCell key={header} className='colHead' style={{textAlign: 'center'}}>{header}</TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => [(
                            <TableRow
                                key={row.name}
                                className={(row.subData ? "parentRow" : '')}
                                onClick={(row.subData ? () => this.toggleChildRows(row.toggleID) : '')}
                            >
                                <TableCell className='tableDataCell'>{row.data.actual}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.budget}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.budVar}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.budVarPercent}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.priorYear}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.pyVar}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.pyVarPercent}</TableCell>
                                <TableCell component="th" className='colHead' style={{textAlign: 'center'}}>{row.name}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.actual}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.budget}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.budVar}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.budVarPercent}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.priorYear}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.pyVar}</TableCell>
                                <TableCell className='tableDataCell'>{row.data.pyVarPercent}</TableCell>
                            </TableRow>
                            ), (row.subData ? row.subData.map(subRow => (
                                <TableRow key={subRow.name} className={"childRow " + row.toggleID} style={{display: 'none'}}>
                                    <TableCell className='tableDataCell'>{subRow.data.actual}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.budget}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.budVar}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.budVarPercent}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.priorYear}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.pyVar}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.pyVarPercent}</TableCell>
                                    <TableCell component="th" className='colHead' style={{textAlign: 'center'}}>{subRow.name}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.actual}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.budget}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.budVar}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.budVarPercent}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.priorYear}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.pyVar}</TableCell>
                                    <TableCell className='tableDataCell'>{subRow.data.pyVarPercent}</TableCell>
                                </TableRow>))
                                : '')
                            ])}
                        </TableBody>
                        </Table>
                    </Paper>
                </TabContainer>
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