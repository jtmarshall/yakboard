import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";


export default class EFacilityAdmitGoal extends Component {

    state = {
        title: this.props.title,
        chardID: this.props.id,
        height: this.props.height || '260px',
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
            <Card style={{height: cardHeight}}>
                <CardBody style={{padding: '20px',}}>
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
                    text: 'Admits Goal',
                    x: 'center',
                }
            ],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: 'Traffic',
                    type: 'pie',
                    radius: '55%',
                    color: ['#365CA0', '#fff'],
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [
                        {value: 335, name: 'Admits'},
                        {value: 65, name: 'NA'},
                    ]
                }
            ]
        };

        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }
}