import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";
import toolbox from "../../tools/toolbox";
import moment from "moment";
import colorPalette from "../../tools/colorPalette";


export default class EMixed extends Component {

    constructor(props) {
        super(props);

        // Retrieve local store
        let yakPak = toolbox.retrievePak();
        let toDate = yakPak == null ? new Date() : new Date(yakPak.DateFrame.To);
        let startDay = yakPak == null ? moment().add(-7, 'days') : moment(yakPak.DateFrame.From);
        let endDay = yakPak == null ? moment() : moment(yakPak.DateFrame.To);
        let numbDays = endDay.diff(startDay, 'days');

        let primaryLabels = [];
        let temp = moment(toDate);

        // Generate date labels starting with 'toDate' and iterating back through length of data
        for (let i = -1; i < numbDays; i++) {
            // parse date for how many days prior
            primaryLabels.unshift(moment(temp).subtract(i, 'd').format('M/D'));
        }

        this.state = {
            title: this.props.title,
            chardID: this.props.id || 'eMixed',
            height: this.props.height || '420px',
            width: this.props.width || 'auto',
            headerColor: this.props.headerColor || 'prime',
            backgroundColor: this.props.backgroundColor || '#fff',
            axisLabels: primaryLabels,
        };
    }

    // update search metric selection
    handleSelect = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        // Parse height of chart
        let chartHeight = parseInt(this.state.height);
        // then set card height to 10% increase to ensure card fits
        let cardHeight = (chartHeight + (chartHeight * .1)) + 'px';

        return (
            <Card style={{padding: '0px', height: cardHeight, backgroundColor: this.state.backgroundColor}}>
                <CardBody style={{padding: '20px',}}>
                    <div id={this.state.chardID} style={{width: this.state.width, height: this.state.height}}/>
                </CardBody>
            </Card>
        )
    }

    componentDidMount() {
        let randata = [];
        let randata2 = [];

        for (let i = 0; i < this.state.axisLabels.length; i++) {
            randata[i] = Math.floor(Math.random() * Math.floor(20));
            randata2[i] = Math.floor(Math.random() * Math.floor(20));
        }

        let myChart = echarts.init(document.getElementById(this.state.chardID));

        // specify chart configuration item and data
        let option = {
            title: {
                text: 'Touch v Conversion',
                x: 'center',
            },
            color: colorPalette.acadiaCorp,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['Directories', 'Internal Directories', 'Lead Gen', 'Other', 'Conversion']
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.state.axisLabels,
                    axisPointer: {
                        type: 'shadow'
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Touch',
                    interval: 20,
                    max: 100,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'Conversion',
                    interval: 5,
                    max: 25,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: 'Directories',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Directories',
                    stack: 2,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Internal Directories',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Internal Directories',
                    stack: 2,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Lead Gen',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Lead Gen',
                    stack: 2,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Other',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Other',
                    stack: 2,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Conversion',
                    type: 'line',
                    yAxisIndex: 1,
                    data: randata
                }
            ]
        };

        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }
}