import React, { Component } from 'react';
// import * as swipes from 'react-swipe-events';
import './weatherNow.css';
import '../HourlyTemp/HourlyTemp.css';
import * as utils from '../utils/utils';
import {formatDateSimple} from '../utils/dateFormatter';
import * as constants from '../constants';
import HourlyTemp from '../HourlyTemp/HourlyTemp';
import {HistoryBarometerHumidityComponent} from '../History/history';
class WeatherNow extends Component {
  constructor(props){
      super(props);
      this.minTempTime=utils.currentDate();
      this.maxTempTime=utils.currentDate();
      this.tempTrend = "";
      this.state = {
          forecast: null,
          curTime: '',
          // units:utils.getCookie('temperature-units') || 'C'
          units: localStorage.getItem('temperature-units') || 'C',
          historyBarometerShown: false
      };
  }
  componentDidMount() {
	}
	static getDerivedStateFromProps(props, state) {
		return { units: localStorage.getItem('temperature-units') || 'C' };
	}
  hourlyData = (forecasts) => {
      let forecastMaxTempPrev=-273;
      let forecastMinTempPrev=100;
      let minStop=false;
      let maxStop=false;
      let maxTempC=-273;
      let minTempC=100;
      let currentIcon='weather';
      //console.log('forecasts',forecasts);
      //let forecastDateTimePrev = Date().substring(0,16);
      let forecastArrayOut = [];
      for (let i in forecasts) {
          if (i > 0) { // ignore 1st element because it is in the past, considering 3hr difference
              let forecastDateTime = forecasts[i]["forecast_date"];
              let forecastDateTimeD =new Date(forecastDateTime);
              forecastDateTimeD.setHours(forecastDateTimeD.getHours()-3);
              forecastDateTime = formatDateSimple(forecastDateTimeD);
              //console.log('forecasts',forecasts[i]);
              const rec = forecasts[i];
              let forecast=JSON.parse(rec.forecasts);
              const hourlyWeather = forecast.weather[0];
              let conditionDescription = hourlyWeather.description;
              let icon = hourlyWeather.icon;
              if (Number(i) === 1) {
                  currentIcon = icon;
              }
              //if (new Date(forecastDate)>minMaxPeriod) {
              //      break;
              //}
              //else {
              let forecastMaxTemp=(Number(forecast.main.temp_max)-273) || -273;
              let forecastMinTemp=(Number(forecast.main.temp_min)-273) || +100;
              if (forecastMaxTemp < forecastMaxTempPrev) {maxStop=true;} // stop when max temperature started to decline
              if (forecastMinTemp > forecastMinTempPrev) {minStop=true;} // stop when min temperature started to rise
              if (forecastMaxTemp > maxTempC && !maxStop ) {maxTempC=forecastMaxTemp; this.maxTempTime=forecastDateTime.substring(0,16);}
              if (forecastMinTemp < minTempC && !minStop) {minTempC=forecastMinTemp; this.minTempTime=forecastDateTime.substring(0,16);}
              forecastMaxTempPrev = forecastMaxTemp;
              forecastMinTempPrev = forecastMinTemp;
              //forecastArrayOut.push([forecastMaxTemp.toFixed(0),forecastMinTemp.toFixed(0), forecastDateTime.substring(11,16),conditionDescription, icon]);
              forecastArrayOut.push({"maxTemp":forecastMaxTemp.toFixed(0), "minTemp":forecastMinTemp.toFixed(0), "time":forecastDateTime.substring(11,16), "condition": conditionDescription, "icon": icon});
              //console.log('forecast',forecastDateTime,forecastMaxTemp,forecastMinTemp );
              //}
          }
      }
      const weatherIconElement = document.getElementById('weather_main_img');
      if (weatherIconElement) {
        //console.log('weatherIconElement', weatherIconElement, currentIcon);
        weatherIconElement.src='img/' + currentIcon+'.png';
      }

      if (minTempC === 100){minTempC = "n/a"} else {
          minTempC = minTempC.toFixed(0);
          if (minTempC > 0) {minTempC="+" + minTempC;}
          if (minTempC === "-0") {minTempC = "0";}
      }
      if (maxTempC === -273){maxTempC = "n/a"} else {
          maxTempC=maxTempC.toFixed(0);
          if (maxTempC > 0) {maxTempC="+" + maxTempC;}
          if (maxTempC === "-0") {maxTempC = "0";}
      }
      return {'hourlyForecastData':forecastArrayOut, 'forecastMinTemp':minTempC, 'forecastMaxTemp' : maxTempC};
  }
  switchUnits = () => {
      let units = this.state.units;
      if (units ==='C') { units ='F'} else {units = 'C'}
      // utils.setCookie('temperature-units', units, 3650,'/');
      localStorage.setItem('temperature-units', units);
      this.setState({
          units:units
      });
  }
  swipedLeft = (event) => {
    //alert('swiped left!');
  }
  historyBarometerShow = (e) => {
    e.preventDefault();
    this.setState({
        historyBarometerShown: true
    });
  }
  historyBarometerClose = (e) => {
    this.setState({
        historyBarometerShown: false
    });
  }
  render() {
      const tempC_local=Number(this.props.tempCurrent.temp);
      const tempC_web=Number(this.props.tempCurrent.temp_web);
      const tempC_prev=Number(this.props.tempCurrent.recent_temp);
      let recordedTime = this.props.tempCurrent.recorded_time;
      if (recordedTime && recordedTime.length >= 16) {
        recordedTime = recordedTime.substring(11,16);
      }
      const currentHumidity = this.props.tempCurrent.humidity;
      const currentHumidityWeb = this.props.tempCurrent.humidity_web;
      const currentPressure = this.props.tempCurrent.pressure_web;
      const forecasts=this.props.dataForecast || {};
      // auto switch to web when local isn't showing negative digits or if local is not available
      const source = (!tempC_local || (tempC_local > tempC_web && tempC_web < 0 && tempC_local > 0
         && Math.abs(tempC_local - tempC_web) > 2)) ? 'web':this.props.tempCurrent.source ==='' ? 'local' : this.props.tempCurrent.source;
      //const source = tempC_web >= 0 ? 'local' : 'web';
      const tempC = (source ==='web') ? tempC_web : tempC_local;

      if (tempC > tempC_prev) {this.tempTrend=constants.upArrow;}
      if (tempC < tempC_prev) {this.tempTrend=constants.downArrow;}

      let {hourlyForecastData, forecastMinTemp, forecastMaxTemp} = this.hourlyData(forecasts);
      let tempC_forecast = (this.tempTrend === constants.downArrow) ? forecastMinTemp : forecastMaxTemp;
      //console.log('temps',tempC,tempC_forecast*1.0, tempC>tempC_forecast*1.0 );
      let tempCurrentMain = (this.state.units ==='C') ? tempC.toFixed(0) : (tempC*1.8+32).toFixed(0);
      let tempCurrentSubscript = (this.state.units ==='C') ? (tempC*1.8+32).toFixed(0) : tempC.toFixed(0);
      let tempC3 = source ==="web" ? ((this.state.units ==='C') ? tempC_local.toFixed(0) : (tempC_local*1.8+32).toFixed(0)) : ((this.state.units ==='C') ? tempC_web.toFixed(0) : (tempC_web*1.8+32).toFixed(0));
      let tempForecastMain = (this.state.units ==='C') ? tempC_forecast : (tempC_forecast*1.8+32).toFixed(0);
      let tempForecastSubscript = (this.state.units ==='C') ? (tempC_forecast*1.8+32).toFixed(0): tempC_forecast;
      let forecastTempClass = ((this.tempTrend === constants.downArrow && tempC < tempC_forecast*1.0) || (this.tempTrend === constants.upArrow && tempC > tempC_forecast*1.0)) ?  'temp disabled' : 'temp';
      let tempC_forecast_Time = (this.tempTrend === constants.downArrow) ? 'min: ' + this.minTempTime : 'max: '+this.maxTempTime;
      let pressureMBar = Number(currentPressure);
      let pressureMMHg = pressureMBar / 1.3332239;
      let pressureInHg = pressureMMHg / 25.4;
      //console.log('forecast:',forecasts);
    return(
        <React.Fragment>
        <div>
            <h1 >
              <div className="misc-data datetime">
                  <span id="temp_humid_source">{source}</span>
                  <span id="temp_humid_last_reported">{' at '+recordedTime+' ('+(source === 'web'?'local':'web') +' '+tempC3+String.fromCharCode(176)+')'}</span>&nbsp;
              </div>
                <div style={{height:"30px"}}>
                </div>
                <div className="temperature-overlay">
                    <div className="current-temp">
                        <span id="temp_trend" className="temp">{this.tempTrend}</span>
                        <span id="current_temp" className="temp" onClick = {this.switchUnits}>{tempCurrentMain}<span className="temp-degrees">&deg;</span><span id="current_temp_unit" className="temp-unit">{this.state.units}</span></span>
                        <div id="current_temp_2" className="temp-2">&nbsp;{tempCurrentSubscript}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">{this.state.units ==='C' ? 'F': 'C'}</span></div>
                    </div>
                    <div className="right-arrow">{constants.rightArrow}</div>
                    <div className="forecast-temp">
                        <span id="min_max_temp" className={forecastTempClass} onClick = {this.switchUnits}>{tempForecastMain}<span className="temp-degrees">&deg;</span><span id="current_temp_unit" className="temp-unit">{this.state.units}</span></span>
                        <span id="forecast_temp" className="temp-2">&nbsp;{tempForecastSubscript}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">{this.state.units ==='C' ? 'F': 'C'}</span></span>
                    </div>
                    <div style={{clear:"both",height:"20px"}}></div>
                </div>
                <div className="misc-data datetime-forecast">
                    <span id="temp_forecast_time">{'Expected '+tempC_forecast_Time}</span>
                </div>

                <div className="misc-data humidity">
                    <span>Humidity: </span><span id="current_humidity">{Number(currentHumidity).toFixed(0) + '% (web: ' + Number(currentHumidityWeb).toFixed(0)+')'}</span>% &nbsp;
                </div>
					<div className="misc-data pressure" onClick={this.historyBarometerShow}>
                    <span>Barometer: </span><span id="current_humidity">{pressureMBar.toFixed(0)+'  mBar ('+pressureMMHg.toFixed(0)+' mm / '+pressureInHg.toFixed(2)+' in)'}</span>
                </div>
                <div className = "WeatherNow-hourly-forecast" > { /*onSwipedLeft={this.swipedLeft()} */}
                    {
                      hourlyForecastData.map((forecastArray,i) =>{
                          return (
                              <HourlyTemp key = {i} forecast = {forecastArray} />
                          );
                      })
                    }
                </div>
            </h1>
        </div>
        { this.state.historyBarometerShown &&
        <div>
            <HistoryBarometerHumidityComponent closeCallback={this.historyBarometerClose} />    
        </div>

        }
      </React.Fragment>
    ) // return
  } // render
} //WeatherNow

export default WeatherNow;
