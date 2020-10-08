import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import AddVehicle from '../pages/AddVehicle';
import Models from '../pages/Models';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/models/:id" component={Models} />
			<Route path="/add" component={AddVehicle} />
		</Switch>
	</BrowserRouter>
);

export default Router;
