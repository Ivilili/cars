import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { StoreContext } from '../index';
import firebase from '../utilities/firebase';
import './List.css';

const Models = observer((props) => {
	const store = useContext(StoreContext);

	useEffect(() => {
		getModels();
		// eslint-disable-next-line
	}, []);

	const getModels = async () => {
		await firebase
			.firestore()
			.collection('VehicleMake')
			.doc(props.location.state.id)
			.collection('models')
			.get()
			.then((querySnapshot) => {
				let models = [];
				querySnapshot.forEach((doc) => {
					models.push({ ...doc.data(), id: doc.id });
				});
				store.activeVehicle = models;
			});
	};

	return (
		<Fragment>
			<ul className="model_list">
				{store.activeVehicle.map((model) => (
					<li className="list_item" key={model.id}>
						<h3 className="list_item_title">{model.model}</h3>
						<div className="list_item_abrv">
							<span>make:</span> {model.make}
						</div>
						<div className="list_item_abrv">
							<span>horsepower:</span> {model.horsepower}
						</div>
						<div>
							<Link
								to={{
									pathname: `/edit`,
									state: {
										model: model.model,
										abrv: model.make,
										horsepower: model.horsepower,
										id: model.id
									}
								}}
							>
								<button className="edit-btn">Edit</button>
							</Link>
							<button className="delete-btn" onClick={() => store.onDelete(model.id)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</Fragment>
	);
});

export default Models;
