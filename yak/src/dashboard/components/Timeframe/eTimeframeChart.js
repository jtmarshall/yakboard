import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";
import moment from "moment";
import colorPalette from "../../tools/colorPalette";


// To generate the series data arrays for the chart
function seriesData(stack, labelsLength, colors) {
    // Generate random data
    let randata = [];
    let randata2 = [];

    for (let i = 0; i < labelsLength; i++) {
        randata[i] = Math.floor(Math.random() * Math.floor(20));
        randata2[i] = Math.floor(Math.random() * Math.floor(20));
    }

    return [
        {
            name: 'Directories',
            stack: stack,
            type: 'bar',
            data: randata,
            color: colors[0]
        },
        {
            name: 'Internal Directories',
            stack: stack,
            type: 'bar',
            data: randata,
            color: colors[1]
        },
        {
            name: 'Lead Gen',
            stack: stack,
            type: 'bar',
            data: randata2,
            color: colors[2],
            tooltip: {
                formatter: '{a} {b}: {c}',
            }
        },
        {
            name: 'Other',
            stack: stack,
            type: 'bar',
            data: randata,
            color: colors[3]
        },
        {
            name: 'Placement',
            stack: stack,
            type: 'bar',
            data: randata2,
            color: colors[4]
        },
        {
            name: 'Search',
            stack: stack,
            type: 'bar',
            data: randata,
            color: colors[5]
        },
        {
            name: 'Search Engine',
            stack: stack,
            type: 'bar',
            data: randata2,
            color: colors[6]
        },
        {
            name: 'Sign Up',
            stack: stack,
            type: 'bar',
            data: randata2,
            color: colors[7]
        },
        {
            name: 'Social',
            stack: stack,
            type: 'bar',
            data: randata,
            color: colors[8]
        },
        {
            name: 'Sponsorship',
            stack: stack,
            type: 'bar',
            data: randata2,
            color: colors[9]
        },
        {
            name: 'Conversions',
            type: 'line',
            lineStyle: {
                type: 'solid'
            },
            yAxisIndex: 1,
            data: randata2,
            // stack: stack,
            color: colors[7]
        }
    ];
}

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
            secondaryAxisLabels: this.generateSecondaryLabels(),
            colors: this.props.colors || colorPalette.graphColors.mutedRainbow,
            secondaryColors: colorPalette.graphColors.greenBlue,
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

    // Labels for primary timeframe
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
            startDay = moment(this.props.date.From);
            endDay = moment(this.props.date.To);
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

    // Labels for secondary timeframe
    generateSecondaryLabels = () => {
        let secondaryLabels = [];
        if (!this.props.date.CompareFrom || !this.props.date.CompareTo) {
            return [];
        }

        let startDay = moment(this.props.date.CompareFrom);
        let endDay = moment(this.props.date.CompareTo);

        let numbDays = endDay.diff(startDay, 'days');
        let temp = moment(endDay);
        // Generate date labels starting with 'toDate' and iterating back through length of data
        for (let i = 0; i <= numbDays; i++) {
            // parse date for how many days prior
            secondaryLabels.unshift(moment(temp).subtract(i, 'd').format('M/D'));
        }

        return secondaryLabels;
    };

    // Use comparison labels
    comparisonLabels = () => {
        let primaryLabels = this.state.axisLabels;
        let secondaryLabels = this.state.secondaryAxisLabels;
        let l = primaryLabels.length;
        if (secondaryLabels.length > primaryLabels.length) {
            l = secondaryLabels.length;
        }

        let concatLabels = [];

        for (let i = 0; i < l; i++) {
            let primary = this.state.axisLabels[i] || "NA";
            let secondary = secondaryLabels[i] || "NA";
            concatLabels[i] = primary + " v " + secondary;
        }

        return concatLabels;
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
                <CardBody style={{padding: '12px'}}>
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
        // Generate the series data
        let series = seriesData(1, this.state.axisLabels.length, this.state.colors);
        let axisLabels = this.state.axisLabels;
        // let tooltipPosition = '';
        if (this.props.secondaryDateCheck) {
            let series2 = seriesData(2, this.state.secondaryAxisLabels.length, this.state.secondaryColors);
            series = series.concat(series2);
            axisLabels = this.comparisonLabels();

            // tooltipPosition = function (pos, params, dom, rect, size) {
            //     // tooltip will be fixed on right if mouse hovering on the left and on the left if hovering on the right
            //     let obj = {top: -20};
            //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            //     return obj;
            // };
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
            // color: this.state.secondaryColors,
            textStyle: {
                color: '#fff'
            },
            tooltip: {
                trigger: 'item',
                // position: tooltipPosition,
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                },
                formatter: '',
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
                    data: axisLabels,
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
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'Conversions',
                    // interval: 5,
                    // max: 30,
                    position: 'right',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: series,
        };

        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }
}