import React, { Component } from 'react';
import './css/HourlyTemp.css';
import * as constants from './constants';

//import * as utils from './utils';

class HourlyTemp extends Component {
    constructor(props) {
        super(props);
        this.forecast = null;
    }
    componentDidMount(){
        this.forecast = this.props.forecast;
    }
    componentWillReceiveProps(newProps) {
        this.forecast = newProps.forecast;
        //console.log('newProps', this.forecast);
    }
    render() {
        let forecast = this.forecast;
        if (!forecast) {
            return ('');
        }
        return (
            <React.Fragment>
            <span className = "HourlyTemp-box">
                <span className="HourlyTemp-top-left">{constants.upArrow+this.forecast.maxTemp}</span>
                <span className="HourlyTemp-top-right">{constants.downArrow+this.forecast.minTemp}</span>
                <span className="HourlyTemp-bottom">{this.forecast.time}</span>
                <span className="HourlyTemp-description">{this.forecast.condition}</span>
            </span>
            </React.Fragment>
        );
    }
}
export default HourlyTemp;
