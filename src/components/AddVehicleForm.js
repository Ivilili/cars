import React from 'react';
import { observer } from 'mobx-react';
import storeInstance from '../stores/VehicleStore';
import vehicleModelStore from '../stores/VehicleModelStore';
import '../styles/form.css';

const AddVehicleForm = observer(() => {
	return (
		<div className="form-container">
			<h2 className="h2">Add or Edit Vehicle</h2>
			<form className="add-form" onSubmit={storeInstance.handleSubmit}>
				<div className="form-group">
					<input
						id="name"
						type="text"
						name="name"
						value={storeInstance.values.name}
						placeholder="Name"
						onChange={storeInstance.onChangeInput}
						className="form-control"
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
						className="form-control"
						required
					/>
				</div>
				<button className="save-btn" type="submit">
					{storeInstance.currentId === '' ? 'Add Vehicle' : 'Update Vehicle'}
				</button>
				<button className="back-btn" onClick={vehicleModelStore.goBack}>
					Back
				</button>
			</form>
		</div>
	);
});

export default AddVehicleForm;
