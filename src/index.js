import React from 'react';
import ReactDOM from 'react-dom';
import Router from './utilities/Router';
import storeInstance from './store/VehicleStore';

export const StoreContext = React.createContext();

ReactDOM.render(
	<React.StrictMode>
		<StoreContext.Provider value={storeInstance}>
			<Router />
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
