import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import ListModels from '../components/ListModels';
import { StoreContext } from '../index';
import '../styles/main.css';
import FilterSortModels from '../components/FilterSortModels';
import ModelPagination from '../components/ModelPagination';

function ViewModels() {
	const store = useContext(StoreContext);

	useEffect(() => {
		store.vehicleModelStore.getModels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container models-wrap">
			<div className="jumbotron">
				<Link className="go-back-link" to={{ pathname: `/` }}>
					&#8592; Go Back
				</Link>
				<h1 className="models-title"> {store.routingStore.history.location.state.item} Models</h1>
				<FilterSortModels store={store} />
			</div>
			<ListModels store={store} />
			<ModelPagination store={store} />
		</div>
	);
}

export default observer(ViewModels);
