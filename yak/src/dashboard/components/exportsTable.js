import React from 'react';
import moment from 'moment';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '../tools/table.js';
import Card from '../tools/Card/Card'
import CardHeader from "../tools/Card/CardHeader";
import CardBody from '../tools/Card/CardBody';


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

function ExportsTable(props) {
    const { classes } = props;
    return (
        <div className="">
            <Card>
                <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Previous Exports</h4>
                </CardHeader>
                <CardBody>
                    <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Email", "Options", "Time"]}
                    tableData={[
                        ["Dakota Rice", "Uraguay", "Turnhout", "$36,738"],
                        ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                        ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                        ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                        ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                        ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                    ]}
                    />
                </CardBody>
            </Card>
        </div>
    );
}

export default withStyles(styles)(ExportsTable);
