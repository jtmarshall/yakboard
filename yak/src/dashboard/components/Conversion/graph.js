import React, {Component} from "react";
import {Line, Bar} from 'react-chartjs-2';
import toolbox from "../../tools/toolbox";
import moment from 'moment';

export class ReactChart extends Component {
    constructor(props) {
        super(props);

        // Retrieve local store
        let yakPak = toolbox.retrievePak();
        let toDate = new Date(yakPak.DateFrame.To);
        let startDay = moment(yakPak.DateFrame.From);
        let endDay = moment(yakPak.DateFrame.To);
        let numbDays = endDay.diff(startDay, 'days');

        let primaryLabels = [];

        // Generate date labels starting with 'toDate' and iterating back through length of data
        for (let i = -1; i < numbDays; i++) {
            // parse date for how many days prior
            let temp = new Date();
            temp.setDate(toDate.getDate() - i);
            primaryLabels.unshift((toDate.getUTCMonth() + 1) + "/" + temp.getDate());
        }

        this.state = {
            chartData: {
                labels: primaryLabels,
                datasets: [
                    {
                        label: "Call",
                        backgroundColor: '#4EAF4A',
                        // 'rgba(255, 99, 132, 0.9)',
                        // 'rgba(255, 206, 86, 0.9)',
                        // 'rgba(75, 192, 192, 0.9)',
                        // 'rgba(153, 102, 255, 0.9)',
                        // 'rgba(255, 159, 64, 0.9)'
                        borderColor: '#4EAF4A',
                        // 'rgba(255,99,132,1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                        borderWidth: 2,
                        fill: false,
                        data: [],  // chart data comes from props in domain-card
                    },
                    {
                        label: "5+ TOS",
                        backgroundColor: '#377EB8',
                        borderColor: '#377EB8',
                        borderWidth: 2,
                        fill: false,
                        data: [],
                    },
                ]
            },
            chartOptions: {
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            console.log(data);
                            var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].pointLabel;
                            return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
                        }
                    }
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: !!this.props.chartOptions.xName,  // coercion to bool, true if it exists
                            labelString: this.props.chartOptions.xName
                        },
                        time: {
                            unit: 'day',
                            displayFormats: {
                                quarter: 'MMM D'
                            }
                        },
                        distribution: 'series'
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: !!this.props.chartOptions.yName,  // coercion to bool, true if it exists
                            labelString: this.props.chartOptions.yName
                        },
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        };

        this.calculateDateRange();
    }

    // Grab the current stored date frame and label chart data
    calculateDateRange = () => {
        let yakPak = toolbox.retrievePak();

        // Check if we have comparison dates
        if (yakPak.DateFrame.CompareFrom != '' && yakPak.DateFrame.CompareTo != '') {
            let compareToDate = new Date(yakPak.DateFrame.CompareTo);
            let compareStartDay = moment(yakPak.DateFrame.CompareFrom);
            let compareEndDay = moment(yakPak.DateFrame.CompareTo);
            let compareNumbDays = compareEndDay.diff(compareStartDay, 'days');

            let tempLabels = [];

            for (let i = -1; i < compareNumbDays; i++) {
                // parse date for how many days prior
                let temp = new Date();
                temp.setDate(compareToDate.getDate() - i);
                tempLabels.unshift((compareToDate.getUTCMonth() + 1) + "/" + temp.getDate());
            }

            // Populate data with comparison dates
            this.populateData(this.state.chartData.labels, tempLabels);
        } else {
            this.populateData(this.state.chartData.labels);
        }
    };

    // Pass in calculated date labels, assign them to
    populateData = (dateLabels, compareLabels = null) => {
        let tempObj = this.state.chartData;

        for (let i = 0; i < dateLabels.length; i++) {
            tempObj.datasets[0].data[i] = {
                "x": dateLabels[i],
                "y": Math.floor(Math.random() * Math.floor(150)),
                "pointLabel": dateLabels[i]
            };

            tempObj.datasets[1].data[i] = {
                "x": dateLabels[i],
                "y": Math.floor(Math.random() * Math.floor(400)),
                "pointLabel": dateLabels[i]
            };
        }

        console.log(tempObj);

        if (compareLabels != null) {
            tempObj.datasets[2] = {
                label: "Compare Call",
                backgroundColor: '#5E35B1',
                borderColor: '#5E35B1',
                borderWidth: 2,
                fill: false,
                data: [],
            };
            tempObj.datasets[3] = {
                label: "Compare 5+ TOS",
                backgroundColor: '#FF7F02',
                borderColor: '#FF7F02',
                borderWidth: 2,
                fill: false,
                data: [],
            };

            for (let i = 0; i < dateLabels.length; i++) {
                tempObj.datasets[2].data[i] = {
                    "x": dateLabels[i],
                    "y": compareLabels[i] == null ? 0 : Math.floor(Math.random() * Math.floor(150)),
                    "pointLabel": compareLabels[i] == null ? "Out of Range" : compareLabels[i]
                };

                tempObj.datasets[3].data[i] = {
                    "x": dateLabels[i],
                    "y": compareLabels[i] == null ? 0 : Math.floor(Math.random() * Math.floor(300)),
                    "pointLabel": compareLabels[i] == null ? "Out of Range" : compareLabels[i]
                };
            }
        }

        let dummyOptions = this.state.chartOptions;
        // Set state with fresh data
        this.state = {
            chartData: tempObj,
            chartOptions: dummyOptions,
        }
    };

    render() {
        return (
            <div className="reactChart">
                <Line
                    data={this.state.chartData}
                    options={this.state.chartOptions}
                />
            </div>
        );
    }
}

export default ReactChart;