import React, { Component } from 'react';
import './css/header.css';
import WeatherImg from './img/weather.png'

class Header extends Component {
  render() {
    return (
        <header>
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header navbar-brand">
                <img src={WeatherImg} alt="weather icon" />
                <h1>Fair Lawn, NJ</h1>
              </div>{/* navbar-header */}
            </div>{/* container */}
          </nav>
        </header>
    );
  }
}

export default Header;
