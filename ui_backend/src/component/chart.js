import React, {Component} from 'react';
import { Chart } from 'react-charts'

const data = [
        {
            label: 'Series 1',
            data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        },
        {
            label: 'Series 2',
            data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        }
    ];

const axes =  [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ];

class MyChart extends Component {

    render() {
        return (
            <div>
                <Chart data={data} axes={axes} />
            </div>
        );
    }
}

export default MyChart;
