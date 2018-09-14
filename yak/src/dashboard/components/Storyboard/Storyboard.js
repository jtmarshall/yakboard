import React, {Component} from 'react';
import Card from "../../tools/Card/Card";
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from "../../tools/Card/CardBody";
import Table from "../../tools/table";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";


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

export default class Storyboard extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        tabValue: 0,
        searchMetric: 'ip',
    };

    handleTabChange = (event, tabValue) => {
        this.setState({tabValue});
    };

    // update search metric selection
    handleSelect = name => event => {
        this.setState({
            searchMetric: event.target.value
        });
    };

    render() {
        const {tabValue} = this.state;
        return (
            <div className="storyComponent">
                <h3>Storyboard</h3>

                <Tabs
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                    style={{display: 'inline-block'}}
                >
                    <Tab label="Overview"/>
                    <Tab label="Lookup"/>
                </Tabs>

                {tabValue === 0 && <TabContainer>
                    <Card>
                        <CardHeader color="prime">
                            <h4 className="cardTitleWhite">Sessions</h4>
                        </CardHeader>
                        <CardBody className="cardTable">
                            <Table
                                tableHeaderColor="prime"
                                tableHead={[
                                    "Session ID",
                                    "Pageviews",
                                    "Call?",
                                    "Domain",
                                    "Start URL",
                                    "End URL",
                                    "TOS",
                                ]}
                                tableData={[
                                    ["msdf8s7", "11", "yes", "blueridgemountainrecovery.com", "/admissions", "/admissions/why-choose", "2"],
                                    ["f34r4fvh5", "7", "no", "timberlineknolls.com", "/depression", "/about/location", "6"],
                                    ["34rf3344", "23", "no", "life-healing.com", "/programs", "/about/faq", "3"],
                                    ["yui1sh965", "9", "yes", "burkwoodtreatmentcenter.com", "/lp", "/addiction/detox", "5"],
                                ]}
                            />
                        </CardBody>
                    </Card>
                </TabContainer>}

                {tabValue === 1 && <TabContainer>
                    <form className="" noValidate autoComplete="off">
                        <FormControl style={{width: '120px', paddingRight: '8px'}} className="">
                            <InputLabel htmlFor="filterSearchMetric">Search Metric</InputLabel>
                            <Select
                                className="skuFilterSelect"
                                value={this.state.searchMetric}
                                onChange={this.handleSelect('searchMetric')}
                                inputProps={{
                                    name: 'searchMetric',
                                    id: 'filterSearchMetric',
                                }}
                            >
                                <MenuItem value={'ip'}>IP</MenuItem>
                                <MenuItem value={'phone'}>Phone</MenuItem>
                                <MenuItem value={'passport'}>Passport</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="search"
                            label="Search IP/Phone/Passport"
                            type="search"
                            className=""
                            margin="dense"
                            style={{width: "400px"}}
                        />
                    </form>
                    <Card>
                        <CardHeader color="rose">
                            <h4 className="cardTitleWhite">Lookup Trail</h4>
                        </CardHeader>
                        <CardBody className="">
                            <Table
                                tableHeaderColor="rose"
                                tableHead={[
                                    "IP",
                                    "Domain",
                                    "Page",
                                    "Referrer",
                                    "Geo",
                                    "Mobile",
                                    "Datetime",
                                ]}
                                tableData={[
                                    ["1.144.111.175", "Timberline Knolls", "/eating-disorder/orthorexia/signs-effects/", "", "Greystanes, New South Wales", "true", "2018-08-27 02:28:29"],
                                    ["1.144.111.175", "Timberline Knolls", "/eating-disorder/orthorexia/signs-effects/", "", "Greystanes, New South Wales", "true", "2018-08-27 02:03:01"],
                                    ["1.144.111.175", "Timberline Knolls", "/eating-disorder/body-dysmorphia/", "www.timberlineknolls.com", "Greystanes, New South Wales", "true", "2018-08-27 00:02:44"],
                                    ["1.144.111.175", "Timberline Knolls", "/eating-disorder/orthorexia/signs-effects/", "", "Greystanes, New South Wales", "true", "2018-08-26 23:59:00"],
                                ]}
                            />
                        </CardBody>
                    </Card>
                </TabContainer>}

            </div>
        )
    }
}