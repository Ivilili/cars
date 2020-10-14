import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import storeInstance from '../services/VehicleStore';
import '../styles/main.css';

const ListVehicles = observer(() => {
	return (
		<Fragment>
			<ul className="list">
				{storeInstance.filtered.map((item) => (
					<li className="list_item" key={item.id}>
						<h3 className="list_item_title">{item.name}</h3>
						<div className="list_item_abrv">
							<span>abrv:</span> {item.abrv}
						</div>
						<Link
							to={{
								pathname: `/${item.id}`,
								state: {
									item: item.name,
									id: item.id
								}
							}}
						>
							<button className="view-models">View Models</button>
						</Link>
						<div>
							<button className="edit-btn" onClick={() => storeInstance.getId(item.id)}>
								Edit
							</button>
							<button className="delete-btn" onClick={() => storeInstance.onDelete(item.id)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</Fragment>
	);
});

export default ListVehicles;
