import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../utilities/firebase';
import './Models.css';

const Models = (props) => {
	const [ activeVehicle, setActiveVehicle ] = useState([]);
	const vehicleId = props.location.state.id;

	const getModels = async () => {
		firebase
			.firestore()
			.collection('VehicleMake')
			.doc(vehicleId)
			.collection('models')
			.get()
			.then((querySnapshot) => {
				let models = [];
				querySnapshot.forEach((doc) => {
					models.push({ ...doc.data(), id: doc.id });
				});
				setActiveVehicle(models);
			});
	};

	useEffect(() => {
		getModels();
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			<Link to={{ pathname: `/` }}>Back to Home</Link>
			<h1 className="models-title">{props.location.state.item} models</h1>

			{activeVehicle.map((model) => (
				<ul className="list">
					<li className="list_item" key={model.id}>
						<h3 className="list_item_title">{model.model}</h3>
						<div className="list_item_abrv">
							<span>make:</span> {model.make}
						</div>
						<div className="list_item_abrv">
							<span>horsepower:</span> {model.horsepower}
						</div>
					</li>
				</ul>
			))}
		</Fragment>
	);
};

export default Models;
