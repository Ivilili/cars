import React, { Fragment } from 'react';
import List from './pages/List';
import './App.css';

function App() {
	return (
		<Fragment>
			<h1 className="main_title">Mono Vehicles</h1>
			<p className="main_desc">Simple application with React and Mobx</p>
			<List />
		</Fragment>
	);
}

export default App;
