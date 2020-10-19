import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import ViewVehicle from './pages/ViewVehicle';
import ViewModels from './pages/ViewModels';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import storeInstance from './stores/VehicleStore';
import vehicleModelStore from './stores/VehicleModelStore';
import routingStore from './stores/RouterStore';
import AddVehicleForm from './components/AddVehicleForm';
import AddModelForm from './components/AddModelForm';

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
					<Route path="/addOrEdit" component={AddVehicleForm} />
					<Route exact path="/models/:id" component={ViewModels} />
					<Route path="/addOrEditModel" component={AddModelForm} />
				</Switch>
			</Router>
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
