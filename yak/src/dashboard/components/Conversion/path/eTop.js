import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../../tools/Card/CardBody";
import Card from "../../../tools/Card/Card";
import colorPalette from "../../../tools/colorPalette";


export default class ETop extends Component {

    state = {
        title: this.props.title,
        chardID: this.props.id || 'eTop',
        height: this.props.height || '420px',
        width: this.props.width || 'auto',
        backgroundColor: this.props.backgroundColor || 'none',
        colors: this.props.colors || colorPalette.graphColors.greenBlue,
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

        <div id={this.state.chardID} className='eChart' style={{width: this.state.width, height: this.state.height}}/>
        )
    }

    // Handle color toggle
    componentDidUpdate(prevProps, prevState, snapshot) {
        // Re-run component mount func when component is updated
        this.componentDidMount();
    }

    componentDidMount() {
        let myChart = echarts.init(document.getElementById(this.state.chardID));

        // specify chart configuration item and data
        let option = {
            title: [
                {
                    text: 'Top 5 Paths',
                    x: 'center',
                    // textStyle: {
                    //     color: '#fff'
                    // },
                }
            ],
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // x: 'left',
                x: 'center',
                y: 'bottom',
                // textStyle: {
                //     color: '#fff',
                // },
                data: ['1st', '2nd', '3rd', '4th', '5th']
            },
            series: [
                {
                    name: 'Conversion Paths',
                    type: 'pie',
                    radius: ['40%', '80%'],
                    color: this.state.colors,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '26',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: [
                        {value: 510, name: '1st'},
                        {value: 234, name: '2nd'},
                        {value: 148, name: '3rd'},
                        {value: 135, name: '4th'},
                        {value: 87, name: '5th'},
                    ]
                }
            ]
        };

        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }
}