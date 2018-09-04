import React, {Component} from "react";
import { ResponsiveBar } from 'nivo';
import toolbox from "../../tools/toolbox";

export default class NivoBarGraph extends Component {
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
                    "hot dogColor": "hsl(61, 70%, 50%)",
                    "burger": 33,
                    "burgerColor": "hsl(308, 70%, 50%)",
                    "sandwich": 7,
                    "sandwichColor": "hsl(142, 70%, 50%)",
                    "kebab": 129,
                    "kebabColor": "hsl(74, 70%, 50%)",
                    "fries": 16,
                    "friesColor": "hsl(15, 70%, 50%)",
                    "donut": 18,
                    "donutColor": "hsl(41, 70%, 50%)"
                },
                {
                    "country": "AE",
                    "hot dog": 15,
                    "hot dogColor": "hsl(59, 70%, 50%)",
                    "burger": 9,
                    "burgerColor": "hsl(13, 70%, 50%)",
                    "sandwich": 71,
                    "sandwichColor": "hsl(322, 70%, 50%)",
                    "kebab": 93,
                    "kebabColor": "hsl(109, 70%, 50%)",
                    "fries": 161,
                    "friesColor": "hsl(131, 70%, 50%)",
                    "donut": 146,
                    "donutColor": "hsl(264, 70%, 50%)"
                },
                {
                    "country": "AF",
                    "hot dog": 33,
                    "hot dogColor": "hsl(91, 70%, 50%)",
                    "burger": 59,
                    "burgerColor": "hsl(284, 70%, 50%)",
                    "sandwich": 1,
                    "sandwichColor": "hsl(322, 70%, 50%)",
                    "kebab": 155,
                    "kebabColor": "hsl(110, 70%, 50%)",
                    "fries": 170,
                    "friesColor": "hsl(311, 70%, 50%)",
                    "donut": 34,
                    "donutColor": "hsl(174, 70%, 50%)"
                },
                {
                    "country": "AG",
                    "hot dog": 84,
                    "hot dogColor": "hsl(247, 70%, 50%)",
                    "burger": 188,
                    "burgerColor": "hsl(233, 70%, 50%)",
                    "sandwich": 140,
                    "sandwichColor": "hsl(268, 70%, 50%)",
                    "kebab": 199,
                    "kebabColor": "hsl(24, 70%, 50%)",
                    "fries": 181,
                    "friesColor": "hsl(44, 70%, 50%)",
                    "donut": 191,
                    "donutColor": "hsl(222, 70%, 50%)"
                },
                {
                    "country": "AI",
                    "hot dog": 149,
                    "hot dogColor": "hsl(116, 70%, 50%)",
                    "burger": 90,
                    "burgerColor": "hsl(221, 70%, 50%)",
                    "sandwich": 64,
                    "sandwichColor": "hsl(296, 70%, 50%)",
                    "kebab": 160,
                    "kebabColor": "hsl(25, 70%, 50%)",
                    "fries": 60,
                    "friesColor": "hsl(48, 70%, 50%)",
                    "donut": 21,
                    "donutColor": "hsl(127, 70%, 50%)"
                },
                {
                    "country": "AL",
                    "hot dog": 178,
                    "hot dogColor": "hsl(210, 70%, 50%)",
                    "burger": 29,
                    "burgerColor": "hsl(236, 70%, 50%)",
                    "sandwich": 21,
                    "sandwichColor": "hsl(255, 70%, 50%)",
                    "kebab": 139,
                    "kebabColor": "hsl(217, 70%, 50%)",
                    "fries": 110,
                    "friesColor": "hsl(149, 70%, 50%)",
                    "donut": 164,
                    "donutColor": "hsl(307, 70%, 50%)"
                },
                {
                    "country": "AM",
                    "hot dog": 53,
                    "hot dogColor": "hsl(222, 70%, 50%)",
                    "burger": 55,
                    "burgerColor": "hsl(52, 70%, 50%)",
                    "sandwich": 67,
                    "sandwichColor": "hsl(173, 70%, 50%)",
                    "kebab": 74,
                    "kebabColor": "hsl(146, 70%, 50%)",
                    "fries": 5,
                    "friesColor": "hsl(89, 70%, 50%)",
                    "donut": 102,
                    "donutColor": "hsl(293, 70%, 50%)"
                }
            ]
        }
    }

    render() {
        let nivoData = this.state.chartData;

        return (
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
                            "dataFrom": "keys",
                            "anchor": "bottom-right",
                            "direction": "column",
                            "justify": false,
                            "translateX": 120,
                            "translateY": 0,
                            "itemsSpacing": 2,
                            "itemWidth": 100,
                            "itemHeight": 20,
                            "itemDirection": "left-to-right",
                            "itemOpacity": 0.85,
                            "symbolSize": 20,
                            "effects": [
                                {
                                    "on": "hover",
                                    "style": {
                                        "itemOpacity": 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        );
    }
}