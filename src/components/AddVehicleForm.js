import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import storeInstance from '../stores/VehicleStore';
import '../styles/form.css';

const AddVehicleForm = observer(() => {
	return (
		<div className="container">
			<h2>Add or Edit Vehicle</h2>
			<form className="add-form" onSubmit={storeInstance.handleSubmit}>
				<div className="form-group">
					<input
						id="name"
						type="text"
						name="name"
						value={storeInstance.values.name}
						placeholder="Name"
						onChange={storeInstance.onChangeInput}
						required
					/>
				</div>
				<div className="form-group">
					<input
						id="abrv"
						type="text"
						name="abrv"
						value={storeInstance.values.abrv}
						placeholder="Abrv"
						onChange={storeInstance.onChangeInput}
						required
					/>
				</div>
				<button className="save-btn" type="submit">
					{storeInstance.currentId === '' ? 'Add Vehicle' : 'Update Vehicle'}
				</button>
				<Link to={{ pathname: '/' }} className="return-home-link">
					Return Home
				</Link>
			</form>
		</div>
	);
});

export default AddVehicleForm;
