import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storeInstance from './store/VehicleStore';

export const StoreContext = React.createContext();

ReactDOM.render(
	<React.StrictMode>
		<StoreContext.Provider value={storeInstance}>
			<App />
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
