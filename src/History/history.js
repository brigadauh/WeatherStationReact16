import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './history.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


export const  HistoryBarometerHumidityComponent = (props) => {
	const [barometerData, setBarometerData] = useState([]);
	const [barometerMin, setBarometerMin] = useState(0);
	const [barometerMax, setBarometerMax] = useState(0);
	const [showModal, setShowModal] = useState(true);
	const [modalHeight, setModalHeight] = useState(0);
	const [modalWidth, setModalWidth] = useState(0);

	useEffect(() => {
		setShowModal(true);
		const targetUrl = `/api/weather/history/barometerHumidity`;
		fetch(targetUrl)
		.then(response => response.json())
		.then(data => {
			setBarometerData(data.data);
			let barometerMin = 32767;
			let barometerMax = 0;
			let k = 0;
			data.data.forEach(d => {
				d.timeStamp = d.timeStamp.substring(0, 16).replace('-', '/');
				if (d.barometer > barometerMax) {barometerMax = d.barometer; }
				if (d.barometer < barometerMin) {barometerMin = d.barometer; }
			});
			setBarometerMin(barometerMin);
			setBarometerMax(barometerMax);
			const modal = document.querySelector('.modal-background .modal-window');
			if (modal) {
				const modalHeight = modal.clientHeight;
				const modalWidth = modal.clientWidth;
				setModalHeight(modalHeight);
				setModalWidth(modalWidth);
			}
			// console.log('barometer data:', barometerData);
			// console.log('width/height:', modalWidth, modalHeight);
		});
	}, [setBarometerData, setBarometerMin, setBarometerMax]);
	const modalClose = useCallback((e) => {
		if (props.closeCallback) {
			props.closeCallback(e);
		}
	}, [showModal]);
	const formatXAxis = (tickItem) => {
		return tickItem.substring(11,16);
	  }
	return(
		<React.Fragment>
		<div className="modal-background">
			<div className="modal-window">
				<span className="modal-close" onClick={modalClose}>&times;</span>
					<LineChart width={modalWidth - 30} height={modalHeight -40} data={barometerData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
					<Line type="monotone" dataKey="barometer" stroke="green" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="timeStamp" tickFormatter={formatXAxis} />
					<YAxis type="number" domain={[barometerMin, barometerMax]}/>
					<Tooltip 
					labelFormatter = {(value) => {
						return `Date: ${value}`;
					}}
					/>
				</LineChart>
			</div>
		</div> 
		</React.Fragment>
	);

}
