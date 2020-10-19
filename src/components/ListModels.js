import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../index';
import '../styles/main.css';

const ListModels = observer(() => {
	const store = useContext(StoreContext);
	let makeId = store.routingStore.history.location.state.id;
	return (
		<Fragment>
			<Link
				to={{
					pathname: '/addModel',
					state: { makeId: makeId }
				}}
			>
				<button className="new-model-btn">Add new model</button>
			</Link>

			<ul className="model_list">
				{store.vehicleModelStore.filteredModels.map((model) => (
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
									pathname: '/editModel',
									state: {
										model: model.model,
										make: model.make,
										id: model.id,
										makeId: makeId
									}
								}}
							>
								<button
									className="edit-btn"
									onClick={() => store.vehicleModelStore.handleClick(model.id)}
								>
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
		</Fragment>
	);
});

export default ListModels;
