import React, { Component } from 'react';
//import logo from './logo.svg';
import './css/App.css';
//import Weatherhistory from './WeatherHistory';
import WeatherNow from './WeatherNow/WeatherNow';
//import * as utils from './utils';
import * as controller from './controller';
import Header from './GlobalHeader';
import Footer from './GlobalFooter';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          tempHist: [],

          tempCurr: [],
          forecast: [],
          curTime: "",
          timeElapsed: 0
      };
    }
    componentDidMount(){
        this.interval = setInterval(this.tick, 1000);
        this.setState({timeElapsed: this.state.timeElapsed + 1});
        controller.getDataCurrent(this);
        controller.getDataForecast(this);
        controller.getTime(this, true);
    }
    componentWillUnmount() {
        if (this.interval){
            clearInterval(this.interval);
        }
    }
    render() {
    //let tempHistHtml=[];
    return (
	<React.Fragment>
    	<div id="header">
    	<Header />
    	</div>
        <div className="interface">
          <div className="item-list media-list">
              <WeatherNow
                tempCurrent = {this.state.tempCurr.data && this.state.tempCurr.data.length>0 ? this.state.tempCurr.data[0] : []}
                dataForecast={this.state.forecast && this.state.forecast.length>0 ? this.state.forecast : []}
                timeElapsed = {this.state.timeElapsed}
                />
              <div id="current_time" className="current-time" onClick={(e) => controller.getTime(this,true)}> {this.state.curTime} </div>
              {/*tempHistHtml*/}
          </div>
        </div>
        <Footer />
	</React.Fragment>
    );
    }
}

export default App;
