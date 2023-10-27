
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './settings.css';
/*
const style = { // todo: remove when moved to CSS
    table: {
        borderCollapse: 'collapse'
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
					marginBottom: '40px',
					display: 'flex',
					flexDirection: 'column'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
}
*/

export function SettingsForm({ addEntryToPhoneBook }) {
	// const [firstName, setFirstName] = useState('Coder')
	// const [lastName, setLastName] = useState('Byte')
	// const [phoneNumber, setPhoneNumber] = useState('8885559999');
	const [temperatureUnits, setTemperatureUnits] = useState('C');
	const [theme, setTheme] = useState('dark');

  const formSubmit = (e) => {
      //const newEntry = {
      //    firstName: firstName || '',
      //    lastName: lastName || '',
      //    phoneNumber: phoneNumber || ''
      //}
      //addEntryToPhoneBook(newEntry)
		e.preventDefault();
  }
	useEffect(() => { // sample, todo: implement
	//	const proxyUrl = "https://cors-anywhere.herokuapp.com/";
	//	const targetUrl = `https://cat-fact.herokuapp.com/facts/${theme}`;
	//	fetch(proxyUrl + targetUrl)
	//		.then(response => response.json())
	//		.then(facts => {
	//			setPhoneNumber(facts.text);
	//		});
		const tempUnits = localStorage.getItem('temperature-units');
		const theme = localStorage.getItem('theme');
		if (tempUnits) {
			setTemperatureUnits(tempUnits);
		}
		if (theme) {
			setTheme(theme);
		}
	}, [setTemperatureUnits, setTheme]);

	const storeTemperatureUnits = (value) => {
		console.log('temp. units', value);
		localStorage.setItem('temperature-units', value);
	};
	const storeTheme = (value) => {
		console.log('theme', value);
		localStorage.setItem('theme', value);
	};
	return (
		/*
      <form onSubmit={formSubmit} style={style.form.container}>
          <label>First name:</label>
          <br />
          <input
              style={style.form.inputs}
              className='userFirstname'
              name='userFirstname'
              type='text'
              value={firstName}
              onChange={e => {
                  setFirstName(e.target.value)
              }}
          />
          <br />
          <label>Last name:</label>
          <br />
          <input
              style={style.form.inputs}
              className='userLastname'
              name='userLastname'
              type='text'
              value={lastName}
              onChange={e => {
                  setLastName(e.target.value)
              }}
          />
          <br />
          <label>Phone:</label>
          <br />
          <input
              style={style.form.inputs}
              className='userPhone'
              name='userPhone'
              type='text'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
          />
          <br />
          <input
              style={style.form.submitBtn}
              className='submitButton'
              type='submit'
              value='Add User'
          />
      </form>
			*/
		<form onSubmit={formSubmit} className="settings-form">
			<label>Temperature Units:</label>
			<select className="unitsDD" value={temperatureUnits} onChange={e => {
				setTemperatureUnits(e.target.value); storeTemperatureUnits(e.target.value)
				}}>
				<option value="C">&deg;C</option>
				<option value="F">&deg;F</option>
			</select>
			<label>Theme:</label>
			<select className="themeDD" value={theme} onChange={e => {
				setTheme(e.target.value); storeTheme(e.target.value)
			}}>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
			</select>
            <label>Set Current Location</label>
            <label>Set 2nd Location</label>
		</form>
  )
}

function InformationTable(props) {
    const entries = props.phoneBookEntries
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    entries.map((entry, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    {entry.firstName}
                                </td>
                                <td>
                                    {entry.lastName}
                                </td>
                                <td>
                                    {entry.phoneNumber}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}
