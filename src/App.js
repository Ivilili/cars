import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import List from './pages/List';
import Pagination from './components/Pagination';
import { StoreContext } from './index';

const App = observer(() => {
	const store = useContext(StoreContext);

	useEffect(() => {
		store.fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const paginate = (pageNumber) => {
		store.currentPage = pageNumber;
	};

	const indexOfLastCar = store.currentPage * store.carsPerPage;
	const indexOfFirstCar = indexOfLastCar - store.carsPerPage;
	const currentCars = store.data.slice(indexOfFirstCar, indexOfLastCar);

	return (
		<Fragment>
			<List cars={currentCars} />
			<Pagination carsPerPage={store.carsPerPage} totalCars={store.totalCars} paginate={paginate} />
		</Fragment>
	);
});

export default App;
