import React, { Fragment, useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from './index';
import List from './pages/List';
import Pagination from './components/Pagination';
import Header from './components/Header';

const App = observer(() => {
	const store = useContext(StoreContext);

	useEffect(() => {
		store.fetchData();
		// eslint-disable-next-line
	}, []);

	const onChange = (e) => {
		e.preventDefault();
		store.search = e.target.value;
	};

	const handleSort = (value) => {
		if (value === 'asc') {
			const AscCars = store.filtered.slice().sort((a, b) => (a.name > b.name ? 1 : -1));
			store.data = AscCars;
		} else if (value === 'desc') {
			const DescCars = store.filtered.slice().sort((a, b) => (a.name < b.name ? 1 : -1));
			store.data = DescCars;
		}
	};

	return (
		<Fragment>
			<Header onChange={onChange} handleSort={handleSort} />
			<List />
			<Pagination />
		</Fragment>
	);
});

export default App;
