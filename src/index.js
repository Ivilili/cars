import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { stores } from './stores';

export const StoreContext = React.createContext();

ReactDOM.render(
	<React.StrictMode>
		<StoreContext.Provider value={stores}>
			<App />
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
