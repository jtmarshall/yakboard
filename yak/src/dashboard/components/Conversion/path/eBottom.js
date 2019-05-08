import React, {Component} from 'react';
import * as echarts from "echarts";
import colorPalette from "../../../tools/colorPalette";


export default class EBottom extends Component {

    state = {
        title: this.props.title,
        chardID: this.props.id || 'eBottom',
        height: this.props.height || '360px',
        width: this.props.width || 'auto',
        backgroundColor: this.props.backgroundColor || 'none',
        colors: this.props.colors || colorPalette.graphColors.sunburst,
    };

    // update search metric selection
    handleSelect = event => {
        this.setState({[event.target.name]: event.target.value});
    };


    render() {
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
                    text: 'Worst 5 Paths',
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
                    name: 'Conversion Path',
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