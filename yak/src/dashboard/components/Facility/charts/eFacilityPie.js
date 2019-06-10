import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../../tools/Card/CardBody";
import Card from "../../../tools/Card/Card";


export default class EFacilityPie extends Component {

    state = {
        title: this.props.title,
        chardID: this.props.id,
        height: this.props.height || '380px',
        width: this.props.width || 'auto',
        headerColor: this.props.headerColor || 'prime',
        backgroundColor: this.props.backgroundColor || '#2c343c',
        dataset: [310, 234, 1548, 135, 234, 174, 335],
        // colors: this.props.colors || colorPalette.skittles,
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
            <Card style={{height: cardHeight, backgroundColor: this.state.backgroundColor}} className="facilityPie">
                <CardBody style={{padding: '16px'}}>
                    <div id={this.state.chardID} className='eChart' style={{width: this.state.width, height: this.state.height}}/>
                </CardBody>
            </Card>
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
                    text: 'Spend',
                    x: 'left',
                    textStyle: {
                        color: '#fff'
                    },
                },
                {
                    text: 'Traffic',
                    x: 'center',
                    textStyle: {
                        color: '#fff'
                    },
                }, {
                    text: 'Calls',
                    x: 'right',
                    textStyle: {
                        color: '#fff'
                    },
                }
            ],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // x: 'left',
                x: 'center',
                y: 'bottom',
                textStyle: {
                    color: '#fff',
                },
                data: ['Referring', 'Direct', 'Ad-Video', 'Organic', 'Email', 'Offline', 'CPC']
            },
            series: [
                {
                    name: 'Spend',
                    type: 'pie',
                    radius: ['35%', '65%'],
                    center: ['15%', '50%'],
                    // color: ['#365CA0', '#33C3E9', '#33BFBB', '#A3D50C', '#FFD600', '#E53947', '#9E5E8C'],
                    color: this.props.colors,
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
                        {value: 310, name: 'Referring'},
                        {value: 234, name: 'Direct'},
                        {value: 1548, name: 'Organic'},
                        {value: 135, name: 'Ad-Video'},
                        {value: 234, name: 'Email'},
                        {value: 174, name: 'Offline'},
                        {value: 335, name: 'CPC'},
                    ]
                },
                {
                    name: 'Traffic',
                    type: 'pie',
                    // radius: ['35%', '65%'],
                    radius: '65%',
                    center: ['50%', '50%'],
                    label: {
                        normal: {
                            verticalAlign: 'top',
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
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
                        length2: 5,
                    },
                    data: [
                        {value: 335, name: 'CPC'},
                        {value: 310, name: 'Referring'},
                        {value: 234, name: 'Direct'},
                        {value: 948, name: 'Organic'},
                        {value: 135, name: 'Ad-Video'},
                        {value: 234, name: 'Email'},
                        {value: 174, name: 'Offline'},
                    ]
                },
                {
                    name: 'Calls',
                    type: 'pie',
                    radius: '60%',
                    // radius: ['35%', '65%'],
                    center: ['85%', '50%'],
                    avoidLabelOverlap: true,
                    label: {
                        color: '#fff',
                    },
                    labelLine: {
                        length2: 5,
                    },
                    data: [
                        {value: 335, name: 'CPC'},
                        {value: 310, name: 'Referring'},
                        {value: 234, name: 'Direct'},
                        {value: 1248, name: 'Organic'},
                        {value: 135, name: 'Ad-Video'},
                        {value: 234, name: 'Email'},
                        {value: 174, name: 'Offline'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }
}