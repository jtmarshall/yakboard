import React, {Component} from 'react';
import './conversion.css';
import Table from '../../tools/table.js';
import Card from '../../tools/Card/Card';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from '../../tools/Card/CardBody';
import moment from "moment";
import ETop from './path/eTop';
import EBottom from './path/eBottom';


class ConversionPath extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeToShow: moment().subtract(1, 'month').format('MMMM'),
        };
    }

    render() {
        const timeFrameToShow = this.state.timeToShow;

        return (
            <div className="conversionComponent">
                <h3>Conversion Path</h3>

                <Card className="conversionCard">
                    <CardHeader color="mint">
                        <h4 className="cardTitleWhite">Top Performing Channel Paths - {timeFrameToShow}</h4>
                    </CardHeader>
                    <CardBody className="conversionTable">
                        <Table
                            tableHeaderColor="success"
                            tableHead={[
                                "First",
                                "Middle",
                                "Converting",
                                "Conversion Total"
                            ]}
                            tableData={[
                                ["Organic - Google", "Direct", "Email", "72"],
                                ["Referring", "Referring - Internal", "Referring - Other", "39"],
                                ["Paid Advertising", "Organic - Other", "Email - Lead Gen", "25"],
                                ["Organic - Pinterest", "Email", "Direct", "16"],
                                ["Direct", "Organic - Other", "Email - Lead Gen", "4"],
                            ]}
                        />
                        <br/>
                        <ETop/>
                    </CardBody>
                </Card>

                <Card className="conversionCard">
                    <CardHeader color="danger">
                        <h4 className="cardTitleWhite">Worst Performing Channel Paths - {timeFrameToShow}</h4>
                    </CardHeader>
                    <CardBody className="conversionTable">
                        <Table
                            tableHeaderColor="danger"
                            tableHead={[
                                "First Touch",
                                "Middle Touch",
                                "Converting Touch",
                                "Conversion Total"
                            ]}
                            tableData={[
                                ["Organic - Google", "Direct", "Email", "-72"],
                                ["Referring", "Referring - Internal", "Referring - Other", "-39"],
                                ["Paid Advertising", "Organic - Other", "Email - Lead Gen", "-25"],
                                ["Organic - Pinterest", "Email", "Direct", "-16"],
                                ["Direct", "Organic - Other", "Email - Lead Gen", "-4"],
                            ]}
                        />
                        <br/>
                        <EBottom/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default ConversionPath;