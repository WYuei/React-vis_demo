import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries,LineSeries} from 'react-vis';

const Chart = (props) => {

    const dataArr = props.data.map((d)=> {
        return {x: d.year + '/' + d.quarter,
            y: parseFloat(d.count/1000)}
    });
    console.log('chart',dataArr)
    return (

        <div>
        <XYPlot
            xType="ordinal"
            width={1000}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Period of time(year and quarter)" />
            <YAxis title="Number of pull requests (thousands)" />
            <MarkSeries
                data={dataArr}
                /// all the points are red
                style={{fill: "red"}}
            />
        </XYPlot>
        </div>
    );
}

export default Chart;
