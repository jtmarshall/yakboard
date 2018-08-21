import React, {Component} from "react";
import {Line, Bar} from 'react-chartjs-2';
import toolbox from "../toolbox";

export class ReactChart extends Component {
    constructor(props){
        super(props);
        let today = new Date();

        // Retrieve local store
        let yakPak = toolbox.retrievePak();
        let toDate = new Date(yakPak.DateFrame.To);

        let tempLabels = [];

        // Generate date labels starting today and iterating back through length of data
        for (let i = 0; i < this.props.chartData.length; i++) {
            // parse date for how many days prior
            toDate.setDate(toDate.getDate()-i);
            tempLabels.unshift((toDate.getUTCMonth()+1) +"/"+ toDate.getDate());

            // reset date back to current date
            // toDate = new Date();
        }

        this.state = {
            chartData: {
                labels: tempLabels,
                datasets: [{
                    label: this.props.dataLabel,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    // 'rgba(255, 99, 132, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                    borderColor: 'rgba(54, 162, 235, 1)',
                    // 'rgba(255,99,132,1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: this.props.chartData,  // chart data comes from props in domain-card
                }]
            },
            chartOptions: {
                responsive: true,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.props.xName
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
                            display: true,
                            labelString: this.props.yName
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