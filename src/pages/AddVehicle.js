import React, { Fragment, useState } from 'react';
//import { StoreContext } from '../index';
import { Link } from 'react-router-dom';
import firebase from '../utilities/firebase';

import './AddVehicle.css';

const AddVehicle = () => {
	//const store = useContext(StoreContext);

	const [ name, setName ] = useState('');
	const [ abrv, setAbrv ] = useState('');

	const onCreate = (e) => {
		e.preventDefault(e);
		firebase
			.firestore()
			.collection('VehicleMake')
			.add({
				name,
				abrv
			})
			.then(function() {
				alert('Vehicle successfully added!');
			})
			.catch(function(error) {
				console.error('Error: ', error);
			});
	};

	return (
		<Fragment>
			<div className="container">
				<h1>Add a Vehicle</h1>
				<form className="add-form" onSubmit={onCreate}>
					<div className="form-group">
						<input
							id="name"
							type="text"
							value={name}
							placeholder="Name"
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<input
							id="abrv"
							type="text"
							value={abrv}
							placeholder="Abrv"
							onChange={(e) => {
								setAbrv(e.target.value);
							}}
						/>
					</div>

					<button className="save-btn" type="submit">
						Save
					</button>
					<Link className="return-home-link" to={{ pathname: `/` }}>
						Return Home
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

export default AddVehicle;
