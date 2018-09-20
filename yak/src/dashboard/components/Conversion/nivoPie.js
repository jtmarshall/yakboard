import React, {Component} from "react";
import {ResponsivePie} from 'nivo';
import toolbox from "../../tools/toolbox";
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";

export default class NivoPie extends Component {
    constructor(props) {
        super(props);
        //let today = new Date();

        // Retrieve local store
        let yakPak = toolbox.retrievePak();
        let toDate = new Date(yakPak.DateFrame.To);

        let tempLabels = [];

        // Generate date labels starting with 'toDate' and iterating back through length of data
        for (let i = 0; i < this.props.chartCallData.length; i++) {
            // parse date for how many days prior
            let temp = new Date();
            temp.setDate(toDate.getDate() - i);
            tempLabels.unshift((toDate.getUTCMonth() + 1) + "/" + temp.getDate());
        }

        this.state = {
            chartData: [
                {
                    "id": "organic",
                    "label": "Organic",
                    "value": 180,
                    "color": "hsl(41, 70%, 50%)"
                },
                {
                    "id": "googlePPC",
                    "label": "Google PPC",
                    "value": 425,
                    "color": "hsl(215, 70%, 50%)"
                },
                {
                    "id": "facebook",
                    "label": "Facebook",
                    "value": 539,
                    "color": "hsl(177, 70%, 50%)"
                },
                {
                    "id": "sass",
                    "label": "sass",
                    "value": 292,
                    "color": "hsl(110, 70%, 50%)"
                },
                {
                    "id": "haskell",
                    "label": "haskell",
                    "value": 317,
                    "color": "hsl(135, 70%, 50%)"
                }
            ]
        }
    }

    render() {
        let nivoData = this.state.chartData;
        let propsColor = this.props.color;
        let title = this.props.title;

        return (
            <Card className="nivoCard">
                <CardHeader color={propsColor}>
                    <h4 className="nivoCardTitle">{title}</h4>
                </CardHeader>
                <CardBody>
                    <div className="nivoGraph">
                        <ResponsivePie
                            data={nivoData}
                            margin={{
                                "top": 40,
                                "right": 80,
                                "bottom": 80,
                                "left": 80
                            }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            colors="set1"
                            colorBy="id"
                            borderWidth={1}
                            borderColor="inherit:darker(0.2)"
                            radialLabelsSkipAngle={10}
                            radialLabelsTextXOffset={6}
                            radialLabelsTextColor="#333333"
                            radialLabelsLinkOffset={0}
                            radialLabelsLinkDiagonalLength={16}
                            radialLabelsLinkHorizontalLength={24}
                            radialLabelsLinkStrokeWidth={1}
                            radialLabelsLinkColor="inherit"
                            slicesLabelsSkipAngle={10}
                            slicesLabelsTextColor="#333333"
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