import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../index';
import '../styles/main.css';
//import AddModelForm from './AddModelForm';

const ListModels = observer(() => {
	const store = useContext(StoreContext);

	const handleClick = (id) => {
		store.storeInstance.currentId = id;
	};

	return (
		<div className="wrapper">
			<Link to={{ pathname: '/addOrEditModel' }}>
				<button className="new-model-btn">Add new model</button>
			</Link>

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
							<Link
								to={{
									pathname: '/addOrEditModel',
									state: {
										model: model.model,
										make: model.make,
										id: model.id
									}
								}}
							>
								<button className="edit-btn" onClick={() => handleClick(model.id)}>
									Edit
								</button>
							</Link>
							<button
								className="delete-btn"
								onClick={() => store.vehicleModelStore.onDeleteModel(model.id)}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
});

export default ListModels;
