import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';

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

export default class Facility extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="facilityComponent">
                <h2>Facility Top-Level Component</h2>

                <Card>
                <CardHeader color="primary">
                    <h4 className={styles.cardTitleWhite}>Simple Table</h4>
                    <p className={styles.cardCategoryWhite}>
                    Here is a subtitle for this table
                    </p>
                </CardHeader>
                <CardBody>
                    <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Country", "City", "Salary"]}
                    tableData={[
                        ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
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
        )
    }
}