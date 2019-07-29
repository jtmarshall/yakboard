import React, {Component} from 'react';
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";
import moment from "moment";
import toolbox from "../../tools/toolbox";
import colorPalette from "../../tools/colorPalette";
import * as echarts from "echarts";
import Tooltip from '@material-ui/core/Tooltip';


export default class EFirstTouch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            timeFrame: this.props.timeFrame,
            chardID: this.props.id || 'eFirstTouch',
            height: this.props.height || '540px',
            width: this.props.width || 'auto',
            headerColor: this.props.headerColor || 'prime',
            backgroundColor: this.props.backgroundColor || '#2c343c',
            axisLabels: this.generateLabels(),
            colors: this.props.colors || colorPalette.graphColors.greenBlue,
            dataLabels: [
                'Directories',
                'Internal Directories',
                'Lead Gen',
                'Other',
                'Placement',
                'Search',
                'Search Engine',
                'Sign Up',
                'Social',
                'Sponsorship',
                'Conversions'
            ],
        };
    }

    generateLabels = () => {
        let primaryLabels = [];
        let timeFrame = this.props.timeFrame;
        let startDay;
        let endDay;
        /* Handle timeFrame url params */
        if (timeFrame !== undefined) {
            if (timeFrame === 'lastWeek') {
                // Set new start/end day for previous week with moment
                startDay = moment().subtract(1, 'weeks').startOf('week');
                endDay = moment().subtract(1, 'weeks').endOf('week');
            } else if (timeFrame === 'lastMonth') {
                // Set new start/end day for previous month with moment
                startDay = moment().subtract(1, 'months').startOf('month');
                endDay = moment().subtract(1, 'months').endOf('month');
            }
        } else {
            /* Default use selected dates from DateComponent */
            // Retrieve local store
            let yakPak = toolbox.retrievePak();
            startDay = yakPak == null ? moment().add(-7, 'days') : moment(yakPak.DateFrame.From);
            endDay = yakPak == null ? moment() : moment(yakPak.DateFrame.To);
        }

        let numbDays = endDay.diff(startDay, 'days');
        let temp = moment(endDay);
        // Generate date labels starting with 'toDate' and iterating back through length of data
        for (let i = 0; i <= numbDays; i++) {
            // parse date for how many days prior
            primaryLabels.unshift(moment(temp).subtract(i, 'd').format('M/D'));
        }

        return primaryLabels;
    };

    componentDidMount() {
        let randata = [];
        let randata2 = [];

        for (let i = 0; i < this.state.axisLabels.length; i++) {
            randata[i] = Math.floor(Math.random() * Math.floor(50));
            randata2[i] = Math.floor(Math.random() * Math.floor(10));
        }

        let myChart = echarts.init(document.getElementById(this.state.chardID));

        // specify chart configuration item and data
        let option = {
            title: {
                text: 'First Touch & Conversions',
                x: 'center',
                textStyle: {
                    color: '#fff'
                },
            },
            color: this.state.colors,
            textStyle: {
                color: '#fff'
            },
            tooltip: {
                // formatter: "{a} <br/>{b}: {c}",
                trigger: 'item',
                axisPointer: {
                    formatter: '{stack}',
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
                data: this.state.dataLabels
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
                    name: 'Touches',
                    // interval: 25,
                    // max: 175,
                    position: 'left',
                },
                {
                    type: 'value',
                    name: 'Conversions',
                    // interval: 5,
                    // max: 30,
                    position: 'right',
                }
            ],
            series: [
                {
                    name: 'Directories',
                    stack: 1,
                    type: 'bar',
                    data: randata,
                },
                {
                    name: 'Internal Directories',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Lead Gen',
                    stack: 1,
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
                    name: 'Placement',
                    stack: 1,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Search',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Search Engine',
                    stack: 1,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Sign Up',
                    stack: 1,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Social',
                    stack: 1,
                    type: 'bar',
                    data: randata
                },
                {
                    name: 'Sponsorship',
                    stack: 1,
                    type: 'bar',
                    data: randata2
                },
                {
                    name: 'Directories',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[0],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata2
                },
                {
                    name: 'Internal Directories',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[1],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata2
                },
                {
                    name: 'Lead Gen',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[2],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata
                },
                {
                    name: 'Other',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[3],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata2
                },
                {
                    name: 'Placement',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[4],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata
                },
                {
                    name: 'Search',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[5],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata2
                },
                {
                    name: 'Search Engine',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[6],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata
                },
                {
                    name: 'Sign Up',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[7],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata2
                },
                {
                    name: 'Social',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[8],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata
                },
                {
                    name: 'Sponsorship',
                    stack: 2,
                    // color: colorPalette.graphColors.sunburst2[9],
                    type: 'bar',
                    yAxisIndex: 1,
                    data: randata2,
                },
            ]
        };
        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }

    render() {
        // Parse height of chart
        let chartHeight = parseInt(this.state.height);
        // then set card height to 10% increase to ensure card fits
        let cardHeight = (chartHeight + (chartHeight * .1)) + 'px';

        return (
            <Card style={{height: cardHeight, backgroundColor: this.state.backgroundColor}}>
                <Tooltip title="Touches shown on left bar / Conversions shown on right bar" placement="top">
                    <CardBody style={{padding: '16px'}}>
                        <div id={this.state.chardID} className='eChart'
                             style={{width: this.state.width, height: this.state.height}}/>
                    </CardBody>
                </Tooltip>
            </Card>
        )
    }
}