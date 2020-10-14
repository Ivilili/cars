import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import ViewVehicle from './pages/ViewVehicle';
import ViewModels from './pages/ViewModels';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import storeInstance from './services/VehicleStore';
import vehicleModelStore from './services/VehicleModelStore';
import routingStore from './services/RouterStore';

const stores = {
	storeInstance,
	vehicleModelStore,
	routingStore
};

export const StoreContext = React.createContext();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routingStore);

ReactDOM.render(
	<React.StrictMode>
		<StoreContext.Provider value={stores}>
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={ViewVehicle} />
					<Route exact path="/:id" component={ViewModels} />
				</Switch>
			</Router>
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
