import React, { Component } from 'react';
import './css/weatherNow.css';
import './css/HourlyTemp.css';
import * as utils from './utils';
import * as constants from './constants';
import HourlyTemp from './HourlyTemp';
class WeatherNow extends Component {


  constructor(props){
      super(props);
      this.minTempTime=utils.currentDate();
      this.maxTempTime=utils.currentDate();
      this.tempTrend = "";
      this.state = {
          forecast:null,
          curTime:'',
          units:utils.getCookie('temperature-units') || 'C'
      };

  }
  hourlyData = (forecasts) => {
      let forecastMaxTempPrev=-273;
      let forecastMinTempPrev=100;
      let minStop=false;
      let maxStop=false;
      let maxTempC=-273;
      let minTempC=100;
      //console.log('forecasts',forecasts);
      //let forecastDateTimePrev = Date().substring(0,16);
      let forecastArrayOut = [];
      for (let i in forecasts) {
          if (i > 0) { // ignore 1st element because it is in the past, considering 3hr difference
              let forecastDateTime = forecasts[i]["forecast_date"];
              let forecastDateTimeD =new Date(forecastDateTime);
              forecastDateTimeD.setHours(forecastDateTimeD.getHours()-3);
              forecastDateTime = utils.formatDate(forecastDateTimeD);
              //console.log('forecastDateTime',forecastDateTime);
              let forecast=forecasts[i]["forecasts"];
              const hourlyWeather = forecast.weather[0];
              let conditionDescription = hourlyWeather.description;
              let icon = hourlyWeather.icon;
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
  componentDidMount() {

  }
  switchUnits = () => {
      let units = this.state.units;
      if (units ==='C') { units ='F'} else {units = 'C'}
      utils.setCookie('temperature-units', units, 3650,'/');
      this.setState({
          units:units
      });
  }

  render() {
      const tempC_local=Number(this.props.tempCurrent.temp);
      const tempC_web=Number(this.props.tempCurrent.temp_web);
      const tempC_prev=Number(this.props.tempCurrent.recent_temp);
      let recordedTime = this.props.tempCurrent.recorded_time;
      const currentHumidity = this.props.tempCurrent.humidity;
      const forecasts=this.props.dataForecast || {};
      const source = (tempC_local > tempC_web && Math.abs(tempC_local - tempC_web) > 1) ? 'web':this.props.tempCurrent.source ==='' ? 'local' : this.props.tempCurrent.source;
      const tempC = (tempC_local > tempC_web && Math.abs(tempC_local - tempC_web) > 1) ? tempC_web : tempC_local;
      if (tempC > tempC_prev) {this.tempTrend=constants.upArrow;}
      if (tempC < tempC_prev) {this.tempTrend=constants.downArrow;}

      let {hourlyForecastData, forecastMinTemp, forecastMaxTemp} = this.hourlyData(forecasts);
      let tempC_forecast = (this.tempTrend === constants.downArrow) ? forecastMinTemp : forecastMaxTemp;
      //console.log('temps',tempC,tempC_forecast*1.0, tempC>tempC_forecast*1.0 );
      let tempC1 = (this.state.units ==='C') ? tempC.toFixed(0) : (tempC*1.8+32).toFixed(0);
      let tempC2 = (this.state.units ==='C') ? (tempC*1.8+32).toFixed(0) : tempC.toFixed(0);
      let temp_forecast1 = (this.state.units ==='C') ? tempC_forecast : (tempC_forecast*1.8+32).toFixed(0);
      let temp_forecast2 = (this.state.units ==='C') ? (tempC_forecast*1.8+32).toFixed(0): tempC_forecast;
      let forecastTempClass = ((this.tempTrend === constants.downArrow && tempC < tempC_forecast*1.0) || (this.tempTrend === constants.upArrow && tempC > tempC_forecast*1.0)) ?  'temp disabled' : 'temp';
      let tempC_forecast_Time = (this.tempTrend === constants.downArrow) ? 'min: ' + this.minTempTime : 'max: '+this.maxTempTime;
      console.log('forecast:',forecasts);
    return(
        <div>
            <h1 >
                <div>
                    <span id="current_temp_2" className="temp-2">&nbsp;{tempC2}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">{this.state.units ==='C' ? 'F': 'C'}</span></span>
                </div>
                <div>
                    <span id="temp_trend" className="temp">{this.tempTrend}</span>
                    <span id="current_temp" className="temp" onClick = {this.switchUnits}>{tempC1}<span className="temp-degrees">&deg;</span><span id="current_temp_unit" className="temp-unit">{this.state.units}</span></span>
                </div>
                <div className="misc-data datetime">
                    <span id="temp_humid_last_reported">{'Current: '+recordedTime}</span>&nbsp;
                    <span id="temp_humid_source">({source})</span>
                </div>
                <div>
                    <span id="min_temp" className={forecastTempClass} onClick = {this.switchUnits}>{temp_forecast1}<span className="temp-degrees">&deg;</span><span id="current_temp_unit" className="temp-unit">{this.state.units}</span></span>
                </div>
                <div>
                    <span id="current_temp_2" className="temp-2">&nbsp;{temp_forecast2}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">{this.state.units ==='C' ? 'F': 'C'}</span></span>
                </div>
                <div className="misc-data datetime">
                    <span id="temp_forecast_time">{'Forecast '+tempC_forecast_Time}</span>
                </div>
                <div className = "WeatherNow-hourly-forecast">
                    {hourlyForecastData.map((forecastArray,i) =>{
                        return (
                            <HourlyTemp key = {i} forecast = {forecastArray} />
                        );
                    }
                    )}
                </div>
            </h1>

            <div className="misc-data humidity">
                <span>Humidity:</span><span id="current_humidity">{Number(currentHumidity).toFixed(0)}</span>%
            </div>

        </div>
    ) // return
  } // render
} //WeatherNow

export default WeatherNow;
