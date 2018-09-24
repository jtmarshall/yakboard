import React, {Component} from "react";
import {ResponsiveBar, ResponsiveLine} from 'nivo';
import toolbox from "../../tools/toolbox";
import CardHeader from "../../tools/Card/CardHeader";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";
import moment from 'moment';

export default class NivoLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: [
                {
                    "id": "Call",
                    "color": "hsl(333, 70%, 50%)",
                    "data": [
                        {
                            "x": "9/1",
                            "y": 291
                        }
                    ]
                },
                {
                    "id": "5+ TOS",
                    "color": "hsl(237, 70%, 50%)",
                    "data": [
                        {
                            "x": "9/1",
                            "y": 153
                        }
                    ]
                }
            ]
        };

        this.calculateDateRange();
    }

    // Grab the current stored date frame and label chart data
    calculateDateRange = () => {
        // Retrieve local store
        let yakPak = toolbox.retrievePak();
        let toDate = new Date(yakPak.DateFrame.To);
        let startDay = moment(localStorage.getItem('fromDate'));
        let endDay = moment(localStorage.getItem('toDate'));
        let numbDays = endDay.diff(startDay, 'days');

        let tempLabels = [];

        // Generate date labels starting with 'toDate' and iterating back through length of data
        for (let i = -1; i < numbDays; i++) {
            // parse date for how many days prior
            let temp = new Date();
            temp.setDate(toDate.getDate() - i);
            tempLabels.unshift((toDate.getUTCMonth() + 1) + "/" + temp.getDate());
        }

        console.log(tempLabels);
        this.populateData(tempLabels);
    };

    // Pass in calculated date labels, assign them to
    populateData = (dateLabels) => {
        let tempObj = this.state.chartData;

        for (let i = 0; i < dateLabels.length; i++) {
            tempObj[0]["data"][i] = {
                "x": dateLabels[i],
                "y": Math.floor(Math.random() * Math.floor(150))
            };

            tempObj[1]["data"][i] = {
                "x": dateLabels[i],
                "y": Math.floor(Math.random() * Math.floor(300))
            };
        }

        console.log(tempObj);

        // Set state with fresh data
        this.state = {
            chartData: tempObj,
        }
    };

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
                                "min": "auto",
                                "max": "auto"
                            }}
                            minY="auto"
                            maxY="auto"
                            axisBottom={{
                                "orient": "bottom",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
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
                            colors={['#4EAF4A', '#FF7F02', '#377EB8']}
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