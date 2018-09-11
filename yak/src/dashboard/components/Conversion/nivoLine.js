import React, {Component} from "react";
import {ResponsiveLine} from 'nivo';
import toolbox from "../../tools/toolbox";
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";

export default class NivoLine extends Component {
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
                    "id": "japan",
                    "data": [
                        {
                            "x": "plane",
                            "y": 291
                        },
                        {
                            "x": "helicopter",
                            "y": 298
                        },
                        {
                            "x": "boat",
                            "y": 253
                        },
                        {
                            "x": "train",
                            "y": 226
                        },
                        {
                            "x": "subway",
                            "y": 257
                        },
                        {
                            "x": "bus",
                            "y": 77
                        },
                        {
                            "x": "car",
                            "y": 160
                        },
                        {
                            "x": "moto",
                            "y": 149
                        },
                        {
                            "x": "bicycle",
                            "y": 104
                        },
                        {
                            "x": "others",
                            "y": 154
                        }
                    ]
                },
                {
                    "id": "france",
                    "data": [
                        {
                            "x": "plane",
                            "y": 153
                        },
                        {
                            "x": "helicopter",
                            "y": 232
                        },
                        {
                            "x": "boat",
                            "y": 267
                        },
                        {
                            "x": "train",
                            "y": 136
                        },
                        {
                            "x": "subway",
                            "y": 145
                        },
                        {
                            "x": "bus",
                            "y": 287
                        },
                        {
                            "x": "car",
                            "y": 12
                        },
                        {
                            "x": "moto",
                            "y": 147
                        },
                        {
                            "x": "bicycle",
                            "y": 168
                        },
                        {
                            "x": "others",
                            "y": 37
                        }
                    ]
                },
                {
                    "id": "us",
                    "data": [
                        {
                            "x": "plane",
                            "y": 250
                        },
                        {
                            "x": "helicopter",
                            "y": 114
                        },
                        {
                            "x": "boat",
                            "y": 96
                        },
                        {
                            "x": "train",
                            "y": 29
                        },
                        {
                            "x": "subway",
                            "y": 29
                        },
                        {
                            "x": "bus",
                            "y": 132
                        },
                        {
                            "x": "car",
                            "y": 221
                        },
                        {
                            "x": "moto",
                            "y": 294
                        },
                        {
                            "x": "bicycle",
                            "y": 261
                        },
                        {
                            "x": "others",
                            "y": 30
                        }
                    ]
                },
                {
                    "id": "germany",
                    "data": [
                        {
                            "x": "plane",
                            "y": 294
                        },
                        {
                            "x": "helicopter",
                            "y": 254
                        },
                        {
                            "x": "boat",
                            "y": 4
                        },
                        {
                            "x": "train",
                            "y": 11
                        },
                        {
                            "x": "subway",
                            "y": 68
                        },
                        {
                            "x": "bus",
                            "y": 35
                        },
                        {
                            "x": "car",
                            "y": 199
                        },
                        {
                            "x": "moto",
                            "y": 54
                        },
                        {
                            "x": "bicycle",
                            "y": 41
                        },
                        {
                            "x": "others",
                            "y": 250
                        }
                    ]
                },
                {
                    "id": "norway",
                    "data": [
                        {
                            "x": "plane",
                            "y": 135
                        },
                        {
                            "x": "helicopter",
                            "y": 124
                        },
                        {
                            "x": "boat",
                            "y": 231
                        },
                        {
                            "x": "train",
                            "y": 109
                        },
                        {
                            "x": "subway",
                            "y": 10
                        },
                        {
                            "x": "bus",
                            "y": 144
                        },
                        {
                            "x": "car",
                            "y": 183
                        },
                        {
                            "x": "moto",
                            "y": 138
                        },
                        {
                            "x": "bicycle",
                            "y": 187
                        },
                        {
                            "x": "others",
                            "y": 217
                        }
                    ]
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
                        <ResponsiveLine
                            data={nivoData}
                            margin={{
                                "top": 50,
                                "right": 110,
                                "bottom": 50,
                                "left": 60
                            }}
                            xScale={{
                                "type": "point"
                            }}
                            yScale={{
                                "type": "linear",
                                "stacked": true,
                                "min": "auto",
                                "max": "auto"
                            }}
                            minY="auto"
                            maxY="auto"
                            stacked={true}
                            axisBottom={{
                                "orient": "bottom",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "transportation",
                                "legendOffset": 36,
                                "legendPosition": "center"
                            }}
                            axisLeft={{
                                "orient": "left",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "count",
                                "legendOffset": -40,
                                "legendPosition": "center"
                            }}
                            dotSize={10}
                            dotColor="inherit:darker(0.3)"
                            dotBorderWidth={2}
                            dotBorderColor="#ffffff"
                            enableDotLabel={true}
                            dotLabel="y"
                            dotLabelYOffset={-12}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            legends={[
                                {
                                    "anchor": "bottom-right",
                                    "direction": "column",
                                    "justify": false,
                                    "translateX": 100,
                                    "translateY": 0,
                                    "itemsSpacing": 0,
                                    "itemDirection": "left-to-right",
                                    "itemWidth": 80,
                                    "itemHeight": 20,
                                    "itemOpacity": 0.75,
                                    "symbolSize": 12,
                                    "symbolShape": "circle",
                                    "symbolBorderColor": "rgba(0, 0, 0, .5)",
                                    "effects": [
                                        {
                                            "on": "hover",
                                            "style": {
                                                "itemBackground": "rgba(0, 0, 0, .03)",
                                                "itemOpacity": 1
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