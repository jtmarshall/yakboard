import React, {Component} from "react";
import {ResponsivePie} from 'nivo';
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";

export default class FacilityPie extends Component {
    constructor(props) {
        super(props);
        //let today = new Date();

        // // Retrieve local store
        // let yakPak = toolbox.retrievePak();
        // let toDate = new Date(yakPak.DateFrame.To);
        //
        // let tempLabels = [];
        //
        // // Generate date labels starting with 'toDate' and iterating back through length of data
        // for (let i = 0; i < this.props.chartCallData.length; i++) {
        //     // parse date for how many days prior
        //     let temp = new Date();
        //     temp.setDate(toDate.getDate() - i);
        //     tempLabels.unshift(moment(temp).format('M') + "/" + temp.getDate());
        // }

        this.state = {
            chartData: [
                {
                    "id": "Direct",
                    "label": "Direct",
                    "value": 425,
                    "color": '#4EAF4A'
                },
                {
                    "id": "Email",
                    "label": "Email",
                    "value": 180,
                    "color": '#377EB8'
                },
                {
                    "id": "Organic",
                    "label": "Organic",
                    "value": 539,
                    "color": '#FF6F00'
                },
                {
                    "id": "Paid Ad",
                    "label": "Paid Advertising",
                    "value": 292,
                    "color": '#AF1B3F'
                },
                {
                    "id": "Referring",
                    "label": "Referring",
                    "value": 317,
                    "color": '#963484'
                }
            ]
        }
    }

    render() {
        let nivoData = this.state.chartData;
        let propsColor = this.props.color;
        let title = this.props.title;

        return (
            <Card className="nivoCard" style={{width: '30%'}}>
                <CardHeader color={propsColor}>
                    <h4 className="nivoCardTitle">{title}</h4>
                </CardHeader>
                <CardBody>
                    <div className="nivoGraph">
                        <ResponsivePie
                            data={nivoData}
                            margin={{
                                "top": 40,
                                "right": 20,
                                "bottom": 40,
                                "left": 20
                            }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            colorBy={function(e){return e.color}}
                            borderWidth={1}
                            borderColor="inherit:darker(0.2)"
                            enableRadialLabels={false}
                            radialLabelsSkipAngle={10}
                            radialLabelsTextXOffset={6}
                            radialLabelsTextColor="#333333"
                            radialLabelsLinkOffset={0}
                            radialLabelsLinkDiagonalLength={16}
                            radialLabelsLinkHorizontalLength={24}
                            radialLabelsLinkStrokeWidth={1}
                            radialLabelsLinkColor="inherit"
                            sliceLabel={function(e){return"".concat(e.id,"\n (").concat(e.value,")")}}
                            slicesLabelsSkipAngle={10}
                            slicesLabelsTextColor="#fff"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            legends={[
                                {
                                    "anchor": "bottom",
                                    "direction": "row",
                                    "translateY": 56,
                                    "itemWidth": 100,
                                    "itemHeight": 18,
                                    "itemTextColor": "#999",
                                    "symbolSize": 18,
                                    "symbolShape": "circle",
                                    "effects": [
                                        {
                                            "on": "hover",
                                            "style": {
                                                "itemTextColor": "#000"
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </div>
                </CardBody>
            </Card>
        );
    }
}