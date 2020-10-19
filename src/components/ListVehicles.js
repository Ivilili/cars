import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import '../styles/main.css';

const ListVehicles = observer(({ store }) => {
	return (
		<Fragment>
			<ul className="list">
				{store.storeInstance.filtered.map((item) => (
					<li className="list_item" key={item.id}>
						<h3 className="list_item_title">{item.name}</h3>
						<div className="list_item_abrv">
							<span>abrv:</span> {item.abrv}
						</div>
						<Link
							to={{
								pathname: `/models/${item.id}`,
								state: {
									item: item.name,
									id: item.id
								}
							}}
						>
							<button className="view-models">View Models</button>
						</Link>
						<div>
							<Link to={{ pathname: '/addOrEdit' }}>
								<button className="edit-btn" onClick={() => store.storeInstance.getId(item.id)}>
									Edit
								</button>
							</Link>
							<button className="delete-btn" onClick={() => store.storeInstance.onDelete(item.id)}>
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
