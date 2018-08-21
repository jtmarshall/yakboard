import React, {Component} from 'react';
import Table from '../tools/table.js';
import Card from '../tools/Card/Card';
import CardHeader from "../tools/Card/CardHeader";
import CardBody from '../tools/Card/CardBody';
import ReactChart from '../tools/graph/graph';
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import moment from "moment/moment";
import MaterialIcon from 'material-icons-react';

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
    }
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

class Conversion extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        tabValue: 0,
    };

    handleTabChange = (event, tabValue) => {
        this.setState({tabValue});
    };

    render() {
        const {classes} = this.props;
        const { tabValue } = this.state;
        return (
            <div className="facilityComponent">
                <h3>Conversion</h3>

                <Tabs
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                    style={{display: 'inline-block'}}
                >
                    <Tab label="Tables"/>
                    <Tab label="Graphs"/>
                </Tabs>

                {tabValue === 0 && <TabContainer>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Channel Performance</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["1st Touch", "Last Touch", "Call Touch", "# of Callers", "Calls >2", "% Total"]}
                                tableData={[
                                    ["Bing", "Direct", "Direct", "5", "2", "5%"],
                                    ["Google", "Direct", "Yext", "17", "9", "45%"],
                                    ["Instagram", "Direct", "Organic", "15", "12", "23%"],
                                    ["Paid Ad", "Quora", "Quora", "7", "2", "83%"],
                                    ["Yext", "Yext", "Yext", "11", "4", "34%"],
                                ]}
                            />
                        </CardBody>
                    </Card>
                </TabContainer>}

                {tabValue === 1 && <TabContainer>
                    <Card className="card">
                        <CardHeader color="prime">
                            <h4 className={classes.cardTitleWhite}>Call Conversions</h4>
                        </CardHeader>
                        <CardBody>
                            <ReactChart chartData={[11, 14, 13, 8, 10, 12]} dataLabel={'Calls'} xName={'X axis'}
                                        yName={'Y axis'}/>
                        </CardBody>
                    </Card>

                    <Card className="card">
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>5+ min Conversions</h4>
                        </CardHeader>
                        <CardBody>
                            <ReactChart chartData={[11, 14, 13, 8, 10, 12]} dataLabel={'5min+'} xName={'X axis'}
                                        yName={'Y axis'}/>
                        </CardBody>
                    </Card>
                </TabContainer>}

            </div>
        )
    }
}

export default withStyles(styles)(Conversion);