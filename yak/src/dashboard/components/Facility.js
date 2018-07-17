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
                <h2>Facility</h2>

                <Card className="card">
                    <CardHeader color="prime">
                        <h4 className={classes.cardTitleWhite}>User Traffic</h4>
                    </CardHeader>
                    <CardBody style={{width: '800px'}}>
                        <ReactChart chartData={[11, 14, 13, 8, 10, 12]}/>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>User Actions</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Export Name", "", "Facility", "Options", "Email", "Time"]}
                            tableData={[
                                ["Bayside-Direct (5/1-5/31)", <MaterialIcon icon='cloud_download' color='#00C853' />, "Bayside Marin", "Direct,All,Google", "jon.snow@acadiahealthcare.com", moment().format("lll")],
                                ["All-Email-Other (6/19-6/20)", <MaterialIcon icon='cloud_download' color='#00C853' />, "All Facilities", "Email,Lead Gen,Other", "tyrion.lannister@acadiahealthcare.com", moment().format("lll")],
                                ["All-LinkedIn (6/10-6/17)", <MaterialIcon icon='cloud_download' color='#00C853' />, "All Facilities", "Organic,Social,LinkedIn", "little.finger@acadiahealthcare.com", moment().format("lll")],
                                ["Galax-PaidAd (5/1-7/1)", <MaterialIcon icon='cloud_download' color='#00C853' />, "Galax", "PaidAd,All,GDN", "eddard.stark@acadiahealthcare.com", moment().format("lll")]
                            ]}
                        />
                    </CardBody>
                </Card>


            </div>
        )
    }
}

export default withStyles(styles)(Facility);