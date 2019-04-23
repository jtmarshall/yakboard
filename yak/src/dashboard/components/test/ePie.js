import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";


export default class EPie extends Component {

    state = {
        title: this.props.title,
        chardID: this.props.id,
        height: this.props.height || '380px',
        width: this.props.width || 'auto',
        headerColor: this.props.headerColor || 'prime',
        backgroundColor: this.props.backgroundColor || '#2c343c',
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
                {/*<CardHeader className="facilityCardHeader" color={this.state.headerColor}>*/}
                {/*    <h4 className="cardTitleWhite">{this.state.title}</h4>*/}
                {/*</CardHeader>*/}
                <CardBody style={{padding: '16px'}}>
                    <div id={this.state.chardID} style={{width: this.state.width, height: this.state.height}}/>
                </CardBody>
            </Card>
        )
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
                }, {
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
                data: ['CPC', 'Referring', 'Direct', 'Ad-Video', 'Organic', 'Email', 'Offline']
            },
            series: [
                {
                    name: 'Spend',
                    type: 'pie',
                    radius: ['35%', '65%'],
                    center: ['15%', '50%'],
                    color: ['#365CA0', '#33C3E9', '#33BFBB', '#A3D50C', '#FFD600', '#E53947', '#9E5E8C'],
                    // color: ['#003f5c', '#374c80', '#7a5195', '#bc5090', '#ef5675', '#ff764a', '#ffa600'],
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
                        {value: 335, name: 'CPC'},
                        {value: 310, name: 'Referring'},
                        {value: 234, name: 'Direct'},
                        {value: 1548, name: 'Organic'},
                        {value: 135, name: 'Ad-Video'},
                        {value: 234, name: 'Email'},
                        {value: 174, name: 'Offline'},
                    ]
                },
                {
                    name: 'Traffic',
                    type: 'pie',
                    // radius: ['35%', '65%'],
                    radius: '55%',
                    center: ['50%', '50%'],
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
                    radius: '55%',
                    // radius: ['35%', '65%'],
                    center: ['85%', '50%'],
                    avoidLabelOverlap: true,
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