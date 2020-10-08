import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { StoreContext } from '../index';
import './List.css';

const List = observer(() => {
	const store = useContext(StoreContext);

	return (
		<Fragment>
			<ul className="list">
				{store.filtered.map((item) => (
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
							<button className="edit-btn" onClick={() => store.getId(item.id)}>
								Edit
							</button>
							<button className="delete-btn" onClick={() => store.onDelete(item.id)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</Fragment>
	);
});

export default List;
