import React, {Component} from 'react';
import Card from '../../tools/Card/Card';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from '../../tools/Card/CardBody';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LineChart from './lineChart';
import ETimeframeChart from './eTimeframeChart';


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

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Timeframe extends Component {
    constructor(props) {
        super(props);
        console.log(props);


        this.state = {
            secondaryDateCheck: this.props.parentState.SecondaryDateCheck,
            tabValue: this.props.parentState.Timeframe.tabValue,
            timeFrame: this.props.match.params.id,
        };

        console.log("construct: ", this.props.match.params.id);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className="conversionComponent">
                <h3>Timeframe</h3>
                <ETimeframeChart id='eTimeframeChart'
                                 timeFrame={this.props.match.params.id}
                                 date={this.props.parentState.DateFrame}
                                 secondaryDateCheck={this.state.secondaryDateCheck}/>

                <Card>
                    <CardHeader color="prime">
                        <h4 className="cardTitleWhite">Touches (Medium) v Conversions</h4>
                    </CardHeader>
                    <CardBody className={classes.cardConversionTable}>
                        <LineChart/>
                    </CardBody>
                </Card>

            </div>
        )
    }
}

export default withStyles(styles)(Timeframe);