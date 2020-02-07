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
                <h1>Fair Lawn, NJ</h1>
              </div>
              <img id="weather_main_img" src="img/weather.png" alt="weather icon" />
              <img className="navigation-menu" src="img/ico-menu.svg" alt="navigation" />
            </div>
          </nav>
        </header>
    );
  }
}

export default Header;
