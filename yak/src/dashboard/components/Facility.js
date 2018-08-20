import React, {Component} from 'react';
import Table from '../tools/table.js';
import Card from '../tools/Card/Card';
import CardHeader from "../tools/Card/CardHeader";
import CardBody from '../tools/Card/CardBody';
import ReactChart from '../tools/graph/graph';
import withStyles from "@material-ui/core/styles/withStyles";
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

class Facility extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="facilityComponent">
                <h3>Conversion</h3>

                <Card className="card">
                    <CardHeader color="prime">
                        <h4 className={classes.cardTitleWhite}>Call Conversions</h4>
                    </CardHeader>
                    <CardBody>
                        <ReactChart chartData={[11, 14, 13, 8, 10, 12]}/>
                    </CardBody>
                </Card>

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


            </div>
        )
    }
}

export default withStyles(styles)(Facility);