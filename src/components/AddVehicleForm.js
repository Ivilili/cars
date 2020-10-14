import React from 'react';
import { observer } from 'mobx-react';
import storeInstance from '../services/VehicleStore';
import '../styles/form.css';

const AddVehicleForm = observer(({ submit, change, values }) => {
	return (
		<form className="add-form" onSubmit={submit}>
			<div className="form-group">
				<input
					id="name"
					type="text"
					name="name"
					value={values.name}
					placeholder="Name"
					onChange={change}
					required
				/>
			</div>
			<div className="form-group">
				<input
					id="abrv"
					type="text"
					name="abrv"
					value={values.abrv}
					placeholder="Abrv"
					onChange={change}
					required
				/>
			</div>
			<button className="save-btn" type="submit">
				{storeInstance.currentId === '' ? 'Add Vehicle' : 'Update Vehicle'}
			</button>
		</form>
	);
});

export default AddVehicleForm;
