import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Header from './GlobalHeader';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Header />, document.getElementById('header'));
//registerServiceWorker();
