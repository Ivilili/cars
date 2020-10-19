import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import ListModels from '../components/ListModels';
import { StoreContext } from '../index';
import '../styles/main.css';
import AddModelForm from '../components/AddModelForm';

function ViewModels() {
	const store = useContext(StoreContext);

	useEffect(() => {
		store.vehicleModelStore.getModels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<Link className="go-back-link" to={{ pathname: `/` }}>
				&#8592; Go Back
			</Link>
			<h2 className="models-title"> {store.routingStore.history.location.state.item} Models</h2>
			<ListModels store={store}>
				<AddModelForm store={store} />
			</ListModels>
		</Fragment>
	);
}

export default observer(ViewModels);
