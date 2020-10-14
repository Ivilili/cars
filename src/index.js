import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import ViewVehicle from './pages/ViewVehicle';
import ViewModels from './pages/ViewModels';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import storeInstance from './store/VehicleStore';
import vehicleModelStore from './store/VehicleModelStore';
import routingStore from './store/RouterStore';

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
					<Route exact path="/:id" component={withRouter(ViewModels)} />
				</Switch>
			</Router>
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
