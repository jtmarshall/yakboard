import React, {Component} from "react";
import {Line, Bar} from 'react-chartjs-2';
import toolbox from "../../tools/toolbox";

export class ReactChart extends Component {
    constructor(props) {
        super(props);
        let today = new Date();

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
            chartData: {
                labels: tempLabels,
                datasets: [
                    {
                        label: this.props.chartOptions.dataLabel,
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                            // 'rgba(255, 99, 132, 0.9)',
                            // 'rgba(255, 206, 86, 0.9)',
                            // 'rgba(75, 192, 192, 0.9)',
                            // 'rgba(153, 102, 255, 0.9)',
                            // 'rgba(255, 159, 64, 0.9)'
                        borderColor: 'rgba(54, 162, 235, 1)',
                        // 'rgba(255,99,132,1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                        borderWidth: 2,
                        hoverBackgroundColor: "rgba(54, 162, 235,0.4)",
                        hoverBorderColor: "rgba(54, 162, 235,1)",
                        data: this.props.chartCallData,  // chart data comes from props in domain-card
                    },
                    // {
                    //     label: "5min+",
                    //     backgroundColor: 'rgba(153, 102, 255, 0.8)',
                    //     borderColor: 'rgba(153, 102, 255, 1)',
                    //     borderWidth: 2,
                    //     hoverBackgroundColor: "rgba(153, 102, 255,0.4)",
                    //     hoverBorderColor: "rgba(153, 102, 255,1)",
                    //     data: this.props.chartData,
                    // },
                    {
                        label: "5min+",
                        backgroundColor: 'rgba(255, 159, 64, 0.8)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 2,
                        hoverBackgroundColor: "rgba(255, 159, 64,0.4)",
                        hoverBorderColor: "rgba(255, 159, 64,1)",
                        data: this.props.chart5minData,
                    },
                ]
            },
            chartOptions: {
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
        }
    }

    render() {
        return (
            <div className="reactChart">
                <Bar
                    data={this.state.chartData}
                    options={this.state.chartOptions}
                />
            </div>
        );
    }
}

export default ReactChart;