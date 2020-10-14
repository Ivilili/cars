import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../index';
import '../styles/main.css';

const ListModels = observer(({ handleClick }) => {
	const store = useContext(StoreContext);

	return (
		<ul className="model_list">
			{store.vehicleModelStore.activeVehicle.map((model) => (
				<li className="list_item" key={model.id}>
					<h3 className="list_item_title">{model.model}</h3>
					<div className="list_item_abrv">
						<span>make:</span> {model.make}
					</div>
					<div className="list_item_abrv">
						<span>horsepower:</span> {model.horsepower}
					</div>
					<div>
						<button className="edit-btn" onClick={() => handleClick(model.id)}>
							Edit
						</button>
						<button className="delete-btn" onClick={() => store.vehicleModelStore.onDeleteModel(model.id)}>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	);
});

export default ListModels;
