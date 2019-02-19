import React, {Component} from "react";
import {ResponsivePie} from 'nivo';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";

export default class FacilityAdmitsGoal extends Component {
    constructor(props) {
        super(props);

        let facilityAdmitGoal = 210;
        let facilityAdmitVal = 150;
        let facilityAdmitPercent = (facilityAdmitVal/facilityAdmitGoal * 100).toFixed(1);

        this.state = {
            chartData: [
                {
                    "id": "Admits",
                    "label": "Admits",
                    "value": facilityAdmitVal,
                    "color": '#365CA0',
                    "percent": facilityAdmitPercent
                },
                {
                    "id": "",
                    "label": "",
                    "value": facilityAdmitGoal - facilityAdmitVal,
                    "color": 'none',
                    "percent": ""
                },
            ]
        }
    }

    render() {
        let nivoData = this.state.chartData;
        let propsColor = this.props.color;
        let title = this.props.title;

        return (
            <Card className="admitsCard" style={{width: '30%', margin: 'auto', padding: '0px', background: 'none', boxShadow: 'none'}}>
                <CardBody>
                    <h4 className="nivoCardTitle" style={{color: 'black'}}>{title}</h4>
                    <div className="admitsPieGraph">
                        <ResponsivePie
                            data={nivoData}
                            margin={{
                                "top": 0,
                                "right": 0,
                                "bottom": 0,
                                "left": 0
                            }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            colorBy={function(e){return e.color}}
                            borderWidth={0}
                            borderColor="inherit:darker(0.2)"
                            enableRadialLabels={false}
                            sliceLabel={function(e){return"".concat(e.percent,"%\n\n (").concat(e.value,")")}}
                            slicesLabelsSkipAngle={10}
                            slicesLabelsTextColor="#fff"
                            animate={false}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                    </div>
                </CardBody>
            </Card>
        );
    }
}