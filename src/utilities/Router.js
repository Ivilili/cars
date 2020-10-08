import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import Edit from '../pages/Edit';
import AddVehicle from '../pages/AddVehicle';
import Models from '../pages/Models';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/models/:id" component={Models} />
			<Route path="/add" component={AddVehicle} />
			<Route path="/edit" component={Edit} />
		</Switch>
	</BrowserRouter>
);

export default Router;
