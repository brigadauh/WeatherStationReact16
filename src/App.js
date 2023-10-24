import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Weatherhistory from './WeatherHistory';
import WeatherNow from './WeatherNow/WeatherNow';
//import * as utils from './utils';
import * as service from './service';
import Header from './GlobalHeader';
import Footer from './GlobalFooter';
import { SettingsForm }  from './Settings/settings';


class App extends Component {
  timeZoneList={};
  constructor(props){
      super(props);
      this.state = {
        tempHist: [],

        tempCurr: [],
        forecast: [],
        curTime: '',
          timeElapsed: 0,
        menuState: ''
    };
  }
  componentDidMount(){
      this.interval = setInterval(this.tick, 1000);
      this.setState({timeElapsed: this.state.timeElapsed + 1});
      service.getDataCurrent(this);
      service.getDataForecast(this);
      service.getTime(this, true);
      this.timezoneList();
  }
  componentWillUnmount() {
      if (this.interval){
          clearInterval(this.interval);
      }
  }
	menuClick = (e) => {
		const menuState = this.state.menuState;
		
		this.setState({ menuState: (!menuState) ? 'settings' : '' });
	}

  timezoneList() {
    const url = `/api/weather/settings/timezone-list`;
    const timeZonesLastRead=localStorage.getItem("timeZonesLastRead");
    const timeZones = localStorage.getItem("timeZones");
    if(timeZones) this.timeZoneList = JSON.parse(timeZones);
    const currentTimeStamp=new Date().getTime();
    if (!timeZonesLastRead || !timeZones || (currentTimeStamp - timeZonesLastRead)/1000 > 3600*4 ) {
    fetch(url, {method:'GET', mode:'no-cors'})
      .then(response => response.json())
      .then(data => {
        //const localTime = new Date(data.timestamp * 1000); // Convert timestamp to milliseconds
        //console.log(`Local time in ${zone}: ${localTime.toLocaleTimeString()}`);
        //console.log(`Response from timezonDB: ${data}`);
        localStorage.setItem("timeZones", JSON.stringify(data));
        localStorage.setItem("timeZonesLastRead", new Date().getTime());
        this.timeZoneList = JSON.parse(localStorage.getItem("timeZones"));
        console.log('timeZoneList from Web', this.timeZoneList);
      })
      .catch(error => console.error(error));
    } else {
      
      console.log('timeZoneList from storage', this.timeZoneList);
    }
  }
  timezone() {
    const apiKey = 'S5AW0I7AMXXL';
    const zone = 'New_York'; // Replace with the desired city name
    const url = `/api/weather/settings/timezone?zone=${encodeURIComponent(zone)}`;
    fetch(url, {method:'GET', mode:'no-cors'})
      .then(response => response.json())
      .then(data => {
        //const localTime = new Date(data.timestamp * 1000); // Convert timestamp to milliseconds
        //console.log(`Local time in ${zone}: ${localTime.toLocaleTimeString()}`);
        console.log(`Response from timezonDB: ${data}`);
      })
      .catch(error => console.error(error));
    
  }
    render() {
    //let tempHistHtml=[];
			const menuState = this.state.menuState;
			const theme = localStorage.getItem('theme');
			document.body.classList.remove('dark');
			if (theme === 'dark') {
				document.body.classList.add(theme);
			}
			return (
				<div>
						{(menuState === 'settings') && <SettingsForm />}
    				<div id="header">
											<Header menuClick={this.menuClick}/>
    				</div>
            <div className="interface">
              <div className="item-list media-list">
                  <WeatherNow
                    tempCurrent = {this.state.tempCurr.data && this.state.tempCurr.data.length>0 ? this.state.tempCurr.data[0] : []}
                    dataForecast={this.state.forecast && this.state.forecast.length>0 ? this.state.forecast : []}
                    timeElapsed = {this.state.timeElapsed}
                    />
                  <div className="current-time time-zone">New York</div>
                  <div id="current_time" className="current-time" onClick={(e) => service.getTime(this,true)}>
                    {this.state.curTime}
                  </div>
                  <div style={{height:'10px'}}></div>
                  <div className="current-time time2 time-zone-2">San Francisco</div>
                  <div id="current_timePT" className="current-time time2" onClick={(e) => service.getTime(this, true)}>
                    {this.state.curTimePT}
                  </div>

                  {/*tempHistHtml*/}
              </div>
            </div>
            <Footer />
	       </div>
        );
    }
}

export default App;
