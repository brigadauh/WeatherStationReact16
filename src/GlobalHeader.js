import React, { Component } from 'react';
import './header.css';
//import WeatherImg from './img/weather.png';

class Header extends Component {
  render() {
    return (
        <header>
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header navbar-brand">
                <img id="weather_main_img" src="img/weather.png" alt="weather icon" />
                <h1>Fair Lawn, NJ</h1>
              </div>{/* navbar-header */}
            </div>{/* container */}
          </nav>
        </header>
    );
  }
}

export default Header;
