import React, { Component } from 'react';
import './css/HourlyTemp.css';
//import * as utils from './utils';

class HourlyTemp extends Component {
    render() {
        return (
            <React.Frame>
            <span className = "HourlyTemp-box">
                <div>
                    <span className="HourlyTemp-top-left">{this.props.tempMax}</span>
                    <span className="HourlyTemp-top-right">{this.props.tempMin}</span>
                </div>
                <div className="HourlyTemp-bottom">{this.props.forcastTime}</div>
            </span>
            </React.Frame>
        );
    }
}
export default HourlyTemp;
