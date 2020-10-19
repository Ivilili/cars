import React, { Fragment, useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import ListVehicles from './../components/ListVehicles';
import Pagination from './../components/Pagination';
import Header from './../components/Header';
import { StoreContext } from '../index';
import '../styles/main.css';

function ViewVehicle() {
	const store = useContext(StoreContext);

	useEffect(() => {
		store.storeInstance.fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<Header store={store} />
			<ListVehicles store={store} />
			<Pagination store={store} />
		</Fragment>
	);
}

export default observer(ViewVehicle);
