import React, { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { StoreContext } from '../index';
import './List.css';

function List() {
	const store = useContext(StoreContext);

	return useObserver(() => (
		<ul className="list">
			{store.VehicleMake.map((item) => (
				<li className="list_item" key={item.id}>
					<h3 className="list_item_title">{item.name}</h3>
					<p className="list_item_abrv">
						<span>abrv:</span> {item.abrv}
					</p>
				</li>
			))}
		</ul>
	));
}

export default List;
