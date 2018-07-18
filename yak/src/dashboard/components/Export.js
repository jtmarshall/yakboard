import React, {Component} from 'react';
import ExportsTable from './exportsTable';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '../tools/Card/Card';
import CardHeader from '../tools/Card/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';


const styles = {
    card: {
        minWidth: 575,
    },
    pos: {
        marginBottom: 12,
    },
    formControl: {
        margin: '5px',
        minWidth: 240,
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
    }
};

class Export extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        exportName: 'Sample Export',
        exportEmail: 'sample@placeholder.com',
        recurrence: '',
        multiline: 'Controlled',
        facility: '',
        touch: '',
        channel: '',
        medium: '',
        source: '',
        disorderDetail: '',
        targeting: '',
        notes: '',
        priority: '',
        trigger: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSelect = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const currentExports = {};

        return (
            <div className="exportComponent">
                <h2>Export</h2>

                <Card>
                    <CardHeader color="mint">
                        <h4 className={classes.cardTitleWhite}>Start New Export</h4>
                        <p className={classes.cardCategoryWhite}>Select options for export.</p>
                    </CardHeader>
                    <CardContent>

                        <form className={classes.container} noValidate autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="exportName"
                                    label="Export Name"
                                    className={classes.textField}
                                    value={this.state.exportName}
                                    onChange={this.handleChange('exportName')}
                                    margin="normal"
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="exportEmail"
                                    label="Your Email"
                                    className={classes.textField}
                                    value={this.state.exportEmail}
                                    onChange={this.handleChange('exportEmail')}
                                    margin="normal"
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="recurrence">Recurrence</InputLabel>
                                <Select
                                    value={this.state.recurrence}
                                    onChange={this.handleSelect}
                                    label="Recurrence"
                                    inputProps={{
                                        name: 'recurrence',
                                        id: 'recurrence',
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'weekly'}>Weekly</MenuItem>
                                    <MenuItem value={'monthly'}>Monthly</MenuItem>
                                </Select>
                            </FormControl>

                            <br/>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="facility">Facility</InputLabel>
                                <Select
                                    value={this.state.facility}
                                    onChange={this.handleSelect}
                                    label="Facility"
                                    inputProps={{
                                        name: 'facility',
                                        id: 'facility',
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value={'all'}>
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={'baysideMarin'}>Bayside Marin</MenuItem>
                                    <MenuItem value={'acadiana'}>Acadiana</MenuItem>
                                    <MenuItem value={'galax'}>Galax</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="touch">Touch</InputLabel>
                                <Select
                                    value={this.state.touch}
                                    onChange={this.handleSelect}
                                    label="Touch"
                                    inputProps={{
                                        name: 'touch',
                                        id: 'touch',
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value="any">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={'first'}>First</MenuItem>
                                    <MenuItem value={'last'}>Last</MenuItem>
                                </Select>
                            </FormControl>

                            <br/>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="channel">Channel</InputLabel>
                                <Select
                                    value={this.state.channel}
                                    onChange={this.handleSelect}
                                    label="Channel"
                                    inputProps={{
                                        name: 'channel',
                                        id: 'channel',
                                    }}
                                >
                                    <MenuItem value={'all'}><em>All</em></MenuItem>
                                    <MenuItem value={"direct"}>Direct</MenuItem>
                                    <MenuItem value={'email'}>Email</MenuItem>
                                    <MenuItem value={'organic'}>Organic</MenuItem>
                                    <MenuItem value={'paid-advertising'}>Paid Advertising</MenuItem>
                                    <MenuItem value={'referring'}>Referring</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="medium">Medium</InputLabel>
                                <Select
                                    value={this.state.medium}
                                    onChange={this.handleSelect}
                                    inputProps={{
                                        name: 'medium',
                                        id: 'medium',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'directories'}>Directories</MenuItem>
                                    <MenuItem value={'internal-directories'}>Internal Directories</MenuItem>
                                    <MenuItem value={'lead-gen'}>Lead Gen</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                    <MenuItem value={'placement'}>Placement</MenuItem>
                                    <MenuItem value={'search'}>Search</MenuItem>
                                    <MenuItem value={'search-engines'}>Search Engines</MenuItem>
                                    <MenuItem value={'sign-up'}>Sign Up</MenuItem>
                                    <MenuItem value={'social'}>Social</MenuItem>
                                    <MenuItem value={'sponsorship'}>Sponsorship</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="source">Source</InputLabel>
                                <Select
                                    value={this.state.source}
                                    onChange={this.handleSelect}
                                    inputProps={{
                                        name: 'source',
                                        id: 'source',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'all'}>All</MenuItem>
                                    <MenuItem value={'directories'}>Directories</MenuItem>
                                    <MenuItem value={'internal-directories'}>Internal Directories</MenuItem>
                                    <MenuItem value={'lead-gen'}>Lead Gen</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                    <MenuItem value={'placement'}>Placement</MenuItem>
                                    <MenuItem value={'search'}>Search</MenuItem>
                                    <MenuItem value={'search-engines'}>Search Engines</MenuItem>
                                    <MenuItem value={'sign-up'}>Sign Up</MenuItem>
                                    <MenuItem value={'social'}>Social</MenuItem>
                                    <MenuItem value={'sponsorship'}>Sponsorship</MenuItem>
                                </Select>
                            </FormControl>

                        </form>
                    </CardContent>

                    <CardActions style={{display: 'block'}}>
                        <Button variant="contained" color="primary" style={{backgroundColor: '#00C853', color: '#ffffff'}} className="">
                            Submit
                        </Button>
                    </CardActions>
                </Card>
                <br/>
                <ExportsTable data={currentExports}/>
            </div>
        )
    }
}

Export.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Export);