import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../index';
import './List.css';

const List = observer(() => {
	const store = useContext(StoreContext);

	return (
		<Fragment>
			<input
				onChange={(e) => {
					store.onChange(e);
				}}
				placeholder="Filter by"
				type="text"
				className="filter_input"
			/>

			<ul className="list">
				{store.filtered.map((item) => (
					<li className="list_item" key={item.id}>
						<h3 className="list_item_title">{item.name}</h3>
						<div className="list_item_abrv">
							<span>abrv:</span> {item.abrv}
						</div>
					</li>
				))}
			</ul>
		</Fragment>
	);
});

export default List;
