import React, {Component} from 'react';
import Card from '../../tools/Card/Card';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from '../../tools/Card/CardBody';
import withStyles from "@material-ui/core/styles/withStyles";
import USAMap from "react-usa-map";
import './Geo.css';


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

class Geo extends Component {
    constructor(props) {
        super(props);
    }

    // Mandatory for maps
    mapHandler = (event) => {
        alert(event.target.dataset.name);
    };

    statesCustomConfig = () => {
        return {
            "NJ": {
                fill: "navy",
                clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
            },
            "NY": {
                fill: "#CC0000"
            }
        };
    };

    render() {
        const {classes} = this.props;


        return (
            <div className="geoComponent">

                <h3>Geo</h3>
                <Card>
                    <CardHeader color="mint">
                        <h4 className="cardTitleWhite">Conversion Heat Map (U.S.)</h4>
                    </CardHeader>
                    <CardBody className={classes.cardConversionTable}>
                        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler}/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Geo);