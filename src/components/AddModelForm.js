import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { StoreContext } from '../index';

const AddModelForm = observer(() => {
	const store = useContext(StoreContext);

	return (
		<div className="container">
			<h2> Add New Model</h2>
			<form className="add-form" onSubmit={store.vehicleModelStore.handleSubmit}>
				<div className="form-group">
					<input
						id="model"
						type="text"
						name="model"
						value={store.vehicleModelStore.formValues.model}
						placeholder="Model"
						onChange={store.vehicleModelStore.onChangeInput}
						required
					/>
				</div>
				<div className="form-group">
					<input
						id="make"
						type="text"
						name="make"
						placeholder="Make"
						value={store.vehicleModelStore.formValues.make}
						onChange={store.vehicleModelStore.onChangeInput}
						required
					/>
				</div>
				<div className="form-group">
					<input
						id="horsepower"
						type="number"
						name="horsepower"
						value={store.vehicleModelStore.formValues.horsepower}
						placeholder="Horsepower"
						onChange={store.vehicleModelStore.onChangeInput}
						required
					/>
				</div>
				<button className="save-btn" type="submit">
					Add Model
				</button>
				<Link to={{ pathname: '/' }} className="return-home-link">
					Return Home
				</Link>
			</form>
		</div>
	);
});

export default withRouter(AddModelForm);