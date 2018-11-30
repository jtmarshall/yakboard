import React, {Component} from 'react';
import Table from '../../tools/table.js';
import Card from '../../tools/Card/Card';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from '../../tools/Card/CardBody';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

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

class ConversionPath extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabValue: this.props.parentState.Conversion.tabValue,
        };
    }


    handleTabChange = (event, tabValue) => {
        this.setState({tabValue});

        this.props.updateDash('tabValue', tabValue);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className="conversionComponent">
                <h3>Conversion Path</h3>
                <Card>
                    <CardHeader color="danger">
                        <h4 className="cardTitleWhite">Frequent Channel Paths</h4>
                    </CardHeader>
                    <CardBody className={classes.cardConversionTable}>
                        <Table
                            tableHeaderColor="info"
                            tableHead={[
                                "First Touch",
                                "Middle Touch",
                                "Converting Touch",
                                "Conversion Total"
                            ]}
                            tableData={[
                                ["Organic - Google", "Direct", "Email", "72"],
                                ["Referring", "Referring - Internal", "Referring - Other", "39"],
                                ["Paid Advertising", "Organic - Other", "Email - Lead Gen", "25"],
                                ["Organic - Pinterest", "Email", "Direct", "15"],
                            ]}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(ConversionPath);