import React, { Component } from 'react';
//import logo from './logo.svg';
import './css/App.css';
//import Weatherhistory from './WeatherHistory';
import WeatherNow from './WeatherNow';
import * as utils from './utils';
import * as controller from './controller';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          tempHist: [],

          tempCurr: [],
          forecast: [],
          curTime: ""
      };
    }
    componentDidMount(){
        controller.getDataCurrent(this);
        controller.getDataForecast(this);
        controller.getTime(this, true);
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render() {
    let tempHistHtml=[];
    return (
        <div className="interface">
          <ul className="item-list media-list">
          <WeatherNow
            tempNow = {this.state.tempCurr.data && this.state.tempCurr.data.length>0 ? this.state.tempCurr.data[0] : []}
            dataForecast={this.state.forecast && this.state.forecast.length>0 ? this.state.forecast : []}
            />
          <li id="current_time" className="current-time" onClick={(e) => controller.getTime(this,true)}> {this.state.curTime} </li>
          {tempHistHtml}</ul>
        </div>
    );
    }
}

export default App;
