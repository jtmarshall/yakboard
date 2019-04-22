import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";
import toolbox from "../../tools/toolbox";
import moment from "moment";


export default class EVolumeChart extends Component {

    constructor(props) {
        super(props);

        // Retrieve local store
        let yakPak = toolbox.retrievePak();
        let toDate = yakPak == null ? new Date() : new Date(yakPak.DateFrame.To);
        let primaryLabels = [];
        let temp = moment(toDate);

        // Generate date labels starting with 'toDate' and iterating back through length of data
        for (let i = -1; i < 12; i++) {
            // parse date for how many days prior
            primaryLabels.unshift(moment(temp).subtract(i, 'months').format('MMM \'YY'));
        }

        this.state = {
            title: this.props.title,
            chardID: this.props.id || 'eVolumeChart',
            height: this.props.height || '420px',
            width: this.props.width || 'auto',
            headerColor: this.props.headerColor || 'prime',
            backgroundColor: this.props.backgroundColor || '#2c343c',
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
                text: 'Year/Year by Month',
                x: 'center',
                textStyle: {
                    color: '#fff'
                },
            },
            color: ['#365CA0', '#33C3E9', '#33BFBB', '#A3D50C', '#FFD600', '#E53947', '#9E5E8C'],
            textStyle: {
                color: '#fff'
            },
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
                textStyle: {
                    color: '#fff'
                },
                data: ['CPC', 'Referring', 'Direct', 'Ad-Video', 'Organic', 'Email', 'Offline', "Inquiries", "Admits"]
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.state.axisLabels,
                    axisPointer: {
                        type: 'shadow'
                    },
                    textStyle: {
                        color: '#fff'
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Touch',
                    interval: 25,
                    max: 150,
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'Conversion',
                    interval: 5,
                    max: 30,
                    position: 'right',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: 'Referring',
                    color: '#365CA0',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Direct',
                    color: '#33C3E9',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Ad-Video',
                    color: '#33BFBB',
                    stack: 1,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Organic',
                    color: '#A3D50C',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Email',
                    color: '#FFD600',
                    stack: 1,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Offline',
                    color: '#E53947',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'CPC',
                    color: '#9E5E8C',
                    stack: 1,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Inquiries',
                    color: '#03DAC6',
                    type: 'line',
                    yAxisIndex: 1,
                    data: randata
                },
                {
                    name: 'Admits',
                    type: 'line',
                    lineStyle: {
                        type: 'dashed'
                    },
                    yAxisIndex: 1,
                    data: randata2
                }
            ]
        };

        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }
}