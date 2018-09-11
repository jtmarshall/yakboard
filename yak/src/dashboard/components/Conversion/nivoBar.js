import React, {Component} from "react";
import {ResponsiveBar} from 'nivo';
import toolbox from "../../tools/toolbox";
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";

export default class NivoBar extends Component {
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
                    "country": "AD",
                    "hot dog": 33,
                    "burger": 33,
                    "sandwich": 7,
                    "kebab": 129,
                    "fries": 16,
                    "donut": 18,
                },
                {
                    "country": "AE",
                    "hot dog": 15,
                    "burger": 9,
                    "sandwich": 71,
                    "kebab": 93,
                    "fries": 161,
                    "donut": 146,
                },
                {
                    "country": "AF",
                    "hot dog": 33,
                    "burger": 59,
                    "sandwich": 1,
                    "kebab": 155,
                    "fries": 170,
                    "donut": 34,
                },
                {
                    "country": "AG",
                    "hot dog": 84,
                    "burger": 188,
                    "sandwich": 140,
                    "kebab": 199,
                    "fries": 181,
                    "donut": 191,
                },
                {
                    "country": "AI",
                    "hot dog": 149,
                    "burger": 90,
                    "sandwich": 64,
                    "kebab": 160,
                    "fries": 60,
                    "donut": 21,
                },
                {
                    "country": "AL",
                    "hot dog": 178,
                    "burger": 29,
                    "sandwich": 21,
                    "kebab": 139,
                    "fries": 110,
                    "donut": 164,
                },
                {
                    "country": "AM",
                    "hot dog": 53,
                    "burger": 55,
                    "sandwich": 67,
                    "kebab": 74,
                    "fries": 5,
                    "donut": 102,
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
                        <ResponsiveBar
                            data={nivoData}
                            keys={[
                                "hot dog",
                                "burger",
                                "sandwich",
                                "kebab",
                                "fries",
                                "donut"
                            ]}
                            indexBy="country"
                            margin={{
                                "top": 50,
                                "right": 130,
                                "bottom": 50,
                                "left": 60
                            }}
                            padding={0.3}
                            colors="nivo"
                            colorBy="id"
                            defs={[
                                {
                                    "id": "dots",
                                    "type": "patternDots",
                                    "background": "inherit",
                                    "color": "#38bcb2",
                                    "size": 4,
                                    "padding": 1,
                                    "stagger": true
                                },
                                {
                                    "id": "lines",
                                    "type": "patternLines",
                                    "background": "inherit",
                                    "color": "#eed312",
                                    "rotation": -45,
                                    "lineWidth": 6,
                                    "spacing": 10
                                }
                            ]}
                            fill={[
                                {
                                    "match": {
                                        "id": "fries"
                                    },
                                    "id": "dots"
                                },
                                {
                                    "match": {
                                        "id": "sandwich"
                                    },
                                    "id": "lines"
                                }
                            ]}
                            borderColor="inherit:darker(1.6)"
                            axisBottom={{
                                "orient": "bottom",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "country",
                                "legendPosition": "center",
                                "legendOffset": 36
                            }}
                            axisLeft={{
                                "orient": "left",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "food",
                                "legendPosition": "center",
                                "legendOffset": -40
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor="inherit:darker(1.6)"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            legends={[
                                {
                                    "anchor": "bottom-right",
                                    "direction": "column",
                                    "translateX": 100,
                                    "itemWidth": 80,
                                    "itemHeight": 20,
                                    "symbolSize": 12,
                                    "symbolShape": "circle"
                                }
                            ]}
                        />
                    </div>
                </CardBody>
            </Card>
        );
    }
}