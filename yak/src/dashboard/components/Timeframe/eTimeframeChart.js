import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";
import toolbox from "../../tools/toolbox";
import moment from "moment";
import colorPalette from "../../tools/colorPalette";


export default class ETimeframeChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            timeFrame: this.props.timeFrame,
            chardID: this.props.id || 'eVolumeChart',
            height: this.props.height || '420px',
            width: this.props.width || 'auto',
            headerColor: this.props.headerColor || 'prime',
            backgroundColor: this.props.backgroundColor || '#2c343c',
            axisLabels: this.generateLabels(),
            colors: this.props.colors || colorPalette.graphColors.mutedRainbow,
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
            <Card style={{height: cardHeight, backgroundColor: this.state.backgroundColor}}>
                <CardBody style={{padding: '16px'}}>
                    <div id={this.state.chardID} className='eChart'
                         style={{width: this.state.width, height: this.state.height}}/>
                </CardBody>
            </Card>
        )
    }

    // Handle color toggle
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.timeFrame !== this.state.timeFrame) {
            this.setState({
                timeFrame: this.props.timeFrame,
                axisLabels: this.generateLabels(),
            });
        } else {
            // Re-run component mount func when component is updated
            this.componentDidMount();
        }
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
                text: 'Touches (Medium) v Conversions',
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
                    interval: 25,
                    // max: 175,
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'Conversions',
                    interval: 5,
                    // max: 30,
                    position: 'right',
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
                    name: 'Conversions',
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