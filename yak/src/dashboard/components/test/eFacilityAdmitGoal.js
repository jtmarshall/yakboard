import React, {Component} from 'react';
import * as echarts from "echarts";
import CardBody from "../../tools/Card/CardBody";
import Card from "../../tools/Card/Card";
import {accent} from '../Facility/facility.css';


export default class EFacilityAdmitGoal extends Component {

    state = {
        title: this.props.title,
        chardID: this.props.id,
        height: this.props.height || '240px',
        width: this.props.width || '200px',
        headerColor: this.props.headerColor || 'prime',
        backgroundColor: this.props.backgroundColor || '#eeeeee',
        admitsColor: accent,
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
            <Card style={{
                maxWidth: '240px',
                height: cardHeight,
                backgroundColor: this.state.backgroundColor,
                boxShadow: 'none',
                margin: 'auto'
            }}>
                <CardBody>
                    <span id="accentColorDummy" style={{color: 'var(--fAccent)'}}/>
                    <div id={this.state.chardID} style={{width: this.state.width, height: this.state.height}}/>
                </CardBody>
            </Card>
        )
    }

    componentDidMount() {
        let myChart = echarts.init(document.getElementById(this.state.chardID));
        let targetGoal = 400;
        let admitsNumb = targetGoal - 33;
        let goalMissNumb = targetGoal - admitsNumb;
        let admitColor = getComputedStyle(document.getElementById('accentColorDummy')).color;

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
                formatter: "{b}: {c}/"+targetGoal+"<br/>({d}%)"
            },
            series: [
                {
                    name: 'Admits',
                    type: 'pie',
                    radius: '80%',
                    color: [admitColor, 'none'],
                    label: {
                        normal: {
                            formatter: '{per|{c}}\n({d}%)',
                            position: 'inner',
                            height: 50,
                            rich: {
                                per: {
                                    color: '#eee',
                                    // backgroundColor: '#334455',
                                    fontSize: 12,
                                    align: 'center',
                                    padding: [2, 3],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data: [
                        {value: admitsNumb, name: 'Admits'},
                        {value: goalMissNumb, label: {show: false,}},
                    ]
                }
            ]
        };

        // use configuration item and data specified to show chart
        myChart.setOption(option);
    }
}