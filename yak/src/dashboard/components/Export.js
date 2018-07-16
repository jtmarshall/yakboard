import React, {Component} from 'react';
import ExportsTable from './exportsTable';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
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
        multiline: 'Controlled',
        rollup: '',
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
        this.setState({ [event.target.name]: event.target.value });
      };

    render() {
        const { classes } = this.props;
        const currentExports = {};
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div className="exportComponent">
                <h2>Exports</h2>

                <ExportsTable
                    data={currentExports}
                />

                <Card>
                    <CardHeader color="mint">
                        <h4 className={classes.cardTitleWhite}>Start New Export</h4>
                        <p className={classes.cardCategoryWhite}>
                        Here is a subtitle for this table
                        </p>
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
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="rollup">Rollup</InputLabel>
                            <Select
                                value={this.state.rollup}
                                onChange={this.handleSelect}
                                label="Rollup"
                                inputProps={{
                                    name: 'rollup',
                                    id: 'rollup',
                                }}
                                autoWidth
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'direct'}>Direct</MenuItem>
                                <MenuItem value={'organic'}>Organic</MenuItem>
                                <MenuItem value={'paid-advertising'}>Paid Advertising</MenuItem>
                                <MenuItem value={'referring'}>Referring</MenuItem>
                                <MenuItem value={'email'}>Email</MenuItem>
                            </Select>
                        </FormControl>

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
                        
                    </form>
                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary">Save</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

Export.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Export);