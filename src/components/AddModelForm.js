import React from 'react';
import { observer } from 'mobx-react';
import storeInstance from '../store/VehicleStore';

const AddModelForm = observer(({ handleSubmit, models, onChangeInput }) => {
	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					id="model"
					type="text"
					name="model"
					value={models.model}
					placeholder="Model"
					onChange={onChangeInput}
					required
				/>
			</div>
			<div className="form-group">
				<select name="make" id="vehicle-make">
					{storeInstance.data.map((car) => (
						<option key={car.id} value={car.name} required>
							{car.name}
						</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<input
					id="horsepower"
					type="number"
					name="horsepower"
					value={models.horsepower}
					placeholder="Horsepower"
					onChange={onChangeInput}
					required
				/>
			</div>
			<button className="save-btn" type="submit">
				{storeInstance.currentId === '' ? 'Add Model' : 'Update Model'}
			</button>
		</form>
	);
});

export default AddModelForm;
