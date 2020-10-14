import React from 'react';
import { observer } from 'mobx-react';
import storeInstance from '../services/VehicleStore';
import routingStore from '../services/RouterStore';
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
				<input
					id="make"
					type="text"
					name="make"
					defaultValue={routingStore.history.location.state.item}
					onChange={onChangeInput}
					required
				/>
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
			{/* <div className="form-group">
				<select name="make" id="vehicle-make" value={storeInstance.vehicleName} onChange={onChangeInput}>
					{storeInstance.vehicleName.map((car, id) => (
						<option key={id} name="make" value={car} required>
							{car}
						</option>
					))}
				</select>
			</div> */}
			<button className="save-btn" type="submit">
				{storeInstance.currentId === '' ? 'Add Model' : 'Update Model'}
			</button>
		</form>
	);
});

export default AddModelForm;
