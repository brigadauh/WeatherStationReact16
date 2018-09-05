import React, { Component } from 'react';
import './css/weatherNow.css';
import './css/HourlyTemp.css';
import * as utils from './utils';
import HourlyTemp from './HourlyTemp';
class WeatherNow extends Component {


  constructor(props){
      super(props);
      this.downArrow = '\u2193';
      this.upArrow = '\u2191';
      this.minTempTime=utils.currentDate();;
      this.maxTempTime=utils.currentDate();;
      this.tempTrend = "";
  }
  componentDidMount() {

  }
  render() {
      const tempC=Number(this.props.tempCurrent.temp);
      const tempC_prev=Number(this.props.tempCurrent.recent_temp);
      const recordedTime = this.props.tempCurrent.recorded_time;
      const currentHumidity = this.props.tempCurrent.humidity;
      const forecasts=this.props.dataForecast || {};
      const source = (this.props.tempCurrent.source === '') ? '(local)':'('+this.props.tempCurrent.source+')';
      let maxTempC=-273;
      let minTempC=100;

      if (tempC > tempC_prev) {this.tempTrend=this.upArrow;}
      if (tempC < tempC_prev) {this.tempTrend=this.downArrow;}

      //console.log('forecasts',forecasts );
      let forecastMaxTempPrev=-273;
      let forecastMinTempPrev=100;
      let minStop=false;
      let maxStop=false;
      //let forecastDateTimePrev = Date().substring(0,16);
      let forecastHTML = [];
      for (let i in forecasts) {
          let forecastDateTime = forecasts[i]["forecast_date"];
          let forecastDateTimeD =new Date(forecastDateTime);
          forecastDateTimeD.setHours(forecastDateTimeD.getHours()-3);
          forecastDateTime = utils.formatDate(forecastDateTimeD);
          //console.log('forecastDateTime',forecastDateTime);
          let forecast=forecasts[i]["forecasts"];
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
              //forecastDateTimePrev = forecastDateTime.substring(0,16);
              forecastHTML.push([this.upArrow+forecastMaxTemp.toFixed(0),this.downArrow+forecastMinTemp.toFixed(0), forecastDateTime.substring(11,16)]);
              //console.log('forecast',forecastDateTime,forecastMaxTemp,forecastMinTemp );
          //}
      }
      if (minTempC === 100){minTempC = "n/a"} else {
          //console.log('minTempC',minTempC );
          minTempC = minTempC.toFixed(0);
          if (minTempC > 0) {minTempC="+" + minTempC;}
          if (minTempC === "-0") {minTempC = "0";}
      }
      if (maxTempC === -273){maxTempC = "n/a"} else {
          maxTempC=maxTempC.toFixed(0);
          if (maxTempC > 0) {maxTempC="+" + maxTempC;}
          if (maxTempC === "-0") {maxTempC = "0";}
      }
      let tempC_forecast = (this.tempTrend === this.downArrow) ? minTempC : maxTempC;
      let tempC_forecast_Time = (this.tempTrend === this.downArrow) ? this.minTempTime : this.maxTempTime;
      //console.log('forecast:',forecasts);
    return(
        <div>
            <h1 >
                <div>
                    <span id="current_temp_2" className="temp-2">&nbsp;{(tempC*1.8+32).toFixed(0)}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">F</span></span>
                </div>
                <div>
                    <span id="temp_trend" className="temp">{this.tempTrend}</span>
                    <span id="current_temp" className="temp">{tempC.toFixed(0)}<span className="temp-degrees">&deg;</span><span id="current_temp_unit" className="temp-unit">C</span></span>
                </div>
                <div className="misc-data datetime">
                    <span id="temp_humid_last_reported">{recordedTime}</span>
                    <span id="temp_humid_source">{source}</span>
                </div>
                <div>
                    <span id="min_temp" className="temp">{tempC_forecast}&deg;</span>
                </div>
                <div>
                    <span id="current_temp_2" className="temp-2">&nbsp;{(tempC_forecast*1.8+32).toFixed(0)}<span className="temp-degrees-2">&deg;</span><span id="current_temp_unit_2" className="temp-unit-2">F</span></span>
                </div>
                <div className="misc-data datetime">
                    <span id="temp_forecast_time">{tempC_forecast_Time}</span>
                </div>
                <div className = "WeatherNow-hourly-forecast">
                    {forecastHTML.map((forecastArray) =>{
                        let hourlyForecast = {};
                        hourlyForecast.minTemp = forecastArray[1];
                        hourlyForecast.maxTemp = forecastArray[0];
                        hourlyForecast.time = forecastArray[2];
                        return (
                            <HourlyTemp key = {hourlyForecast.time} forecast = {hourlyForecast} />
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
