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

class Facility extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        fName: 'Acadia Facility',
        fLogo: 'LOGO HERE',
        fType: 'Inpatient',
        fLoc: 'location',
        commentBox: '',
        admitsCommentBox: '',
        inquiriesCommentBox: '',
        callsCommentBox: '',
        trafficCommentBox: '',
        ytd: '2019',
        ytdPrevious: '2018',
    };

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

    render() {
        const {classes} = this.props;

        return (
            <div className="facilityComponent">
                <h3>Facility Report</h3>

                <div className="row" style={{display: 'inline-flex', width: '90%'}}>
                    <div style={{width: '40%', margin: 'auto'}}>
                        <Card>
                            <CardBody>
                                <h2>{this.state.fLogo}</h2>
                                <h3>{this.state.fName}</h3>
                                <p>
                                    {this.state.fType}
                                    <br/>
                                    {this.state.fLoc}
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                    <div style={{width: '55%'}}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Comments"
                            multiline
                            rows="8"
                            rowsMax="12"
                            value={this.state.commentBox}
                            onChange={this.handleChange('commentBox')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            style={{minWidth: '80%', marginTop: '25px', paddingTop: '6px', overflowX: 'hidden'}}
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
                                    <TableCell align="right">MoM</TableCell>
                                    <TableCell align="right">YTD {this.state.ytd}</TableCell>
                                    <TableCell align="right">YTD {this.state.ytdPrevious}</TableCell>
                                    <TableCell align="center">Comments</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key='admits'>
                                    <TableCell component="th" scope="row">
                                        Admits
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_downward' color='red'/>
                                        <span style={{fontSize: '16px', verticalAlign: 'text-bottom'}}> 6% (184)</span>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
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
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_downward' color='red'/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
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
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
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
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_downward' color='red'/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_upward' color='green'/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MaterialIcon icon='arrow_downward' color='red'/>
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
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

                <hr style={{width: '90%'}}/>
                <FacilityVolume/>
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