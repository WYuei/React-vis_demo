import React,{Component} from 'react'
import {
    XAxis,
    YAxis,
    HorizontalGridLines,
    XYPlot,
    LineSeries,
    Highlight
} from 'react-vis';
import PropTypes from 'prop-types'


export default class HighlightChart extends Component{
    constructor(props)
    {
        super(props)
    }
    data = Array.from(this.props.data)

    dataArr = this.data.map((d)=> {
        return {x: d.year + '/' + d.quarter,
            y: parseFloat(d.count/1000)}
    })
    state = {
        lastDrawLocation: null,
        series: [
            {
                data:this.dataArr,
                disabled: false,
                title: 'Apples'
            }
        ]
    };
    render(){
        const {series, lastDrawLocation} = this.state;

        console.log('data',this.data)
        console.log('props',this.props.data)
        return (
            <div>
                <div>
                    <XYPlot
                        animation
                        xDomain={
                            lastDrawLocation && [
                                lastDrawLocation.left,
                                lastDrawLocation.right
                            ]
                        }
                        yDomain={
                            lastDrawLocation && [
                                lastDrawLocation.bottom,
                                lastDrawLocation.top
                            ]
                        }
                        width={500}
                        height={300}
                    >
                        <HorizontalGridLines />

                        <YAxis />
                        <XAxis />

                        {series.map(entry => (
                            <LineSeries key={entry.title} data={entry.data} />
                        ))}

                        <Highlight
                            onBrushEnd={area => this.setState({lastDrawLocation: area})}
                            onDrag={area => {
                                this.setState({
                                    lastDrawLocation: {
                                        bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                                        left: lastDrawLocation.left - (area.right - area.left),
                                        right: lastDrawLocation.right - (area.right - area.left),
                                        top: lastDrawLocation.top + (area.top - area.bottom)
                                    }
                                });
                            }}
                        />
                    </XYPlot>
                </div>
                <button
                    className="showcase-button"
                    onClick={() => this.setState({lastDrawLocation: null})}
                >
                    Reset Zoom
                </button>
                <div>
                    <h4>
                        <b>Last Draw Area</b>
                    </h4>
                    {lastDrawLocation ? (
                        <ul style={{listStyle: 'none'}}>
                            <li>
                                <b>Top:</b> {lastDrawLocation.top}
                            </li>
                            <li>
                                <b>Right:</b> {lastDrawLocation.right}
                            </li>
                            <li>
                                <b>Bottom:</b> {lastDrawLocation.bottom}
                            </li>
                            <li>
                                <b>Left:</b> {lastDrawLocation.left}
                            </li>
                        </ul>
                    ) : (
                        <span>N/A</span>
                    )}
                </div>
            </div>
        );
    }
}
HighlightChart.propTypes={
    data:PropTypes.array.isRequired
}
