import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class WeatherHistory extends Component {



  render() {
    return(
      <li className="pet-item media">
        <div className="media-left">
        </div>
        <div className="pet-info media-body">
          <div className="pet-head">
            <span className="pet-name">{this.props.singleItem.temp}&deg;F</span>
            <span className="apt-date pull-right">{this.props.singleItem.DateTime}</span>
          </div>
          <div className="owner-name"><span className="label-item">Humidity: {this.props.singleItem.humidity}</span>
          </div>
          <div className="apt-notes">{this.props.singleItem.Notes}</div>
        </div>
      </li>
    ) // return
  } // render
} //AptList

export default WeatherHistory;
