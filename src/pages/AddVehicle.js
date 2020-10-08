import React, { useContext, useState } from 'react';
import { StoreContext } from '../index';
import { observer } from 'mobx-react';
import './AddVehicle.css';

const AddVehicle = observer(() => {
	const store = useContext(StoreContext);

	const formDate = {
		name: '',
		abrv: ''
	};

	const [ values, setValues ] = useState(formDate);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		store.onCreateOrEdit(values);
		setValues({ ...formDate });
	};

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					id="name"
					type="text"
					name="name"
					value={values.name}
					placeholder="Name"
					onChange={onChangeInput}
				/>
			</div>
			<div className="form-group">
				<input
					id="abrv"
					type="text"
					name="abrv"
					value={values.abrv}
					placeholder="Abrv"
					onChange={onChangeInput}
				/>
			</div>
			<button className="save-btn" type="submit">
				{store.currentId === '' ? 'Add Vehicle' : 'Update Vehicle'}
			</button>
		</form>
	);
});

export default AddVehicle;
