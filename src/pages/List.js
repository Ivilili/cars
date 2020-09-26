import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../index';
import './List.css';

const List = observer(() => {
	const store = useContext(StoreContext);

	const onChange = (e) => {
		e.preventDefault();
		store.search = e.target.value;
	};

	const handleSort = (value) => {
		if (value === 'asc') {
			const AscCars = store.filtered.slice().sort((a, b) => (a.name > b.name ? 1 : -1));
			store.data = AscCars;
		} else if (value === 'desc') {
			const DescCars = store.filtered.slice().sort((a, b) => (a.name < b.name ? 1 : -1));
			store.data = DescCars;
		}
	};

	return (
		<Fragment>
			<h1 className="main_title">Mono Vehicles</h1>
			<p className="main_desc">Simple application with React and Mobx</p>
			<div className="control">
				<div className="select">
					<select
						className="sort_section"
						onChange={(e) => {
							handleSort(e.target.value);
						}}
					>
						<option defaultValue="sort">Sort by</option>
						<option value="asc">A-Z</option>
						<option value="desc">Z-A</option>
					</select>
				</div>
			</div>
			<input
				onChange={(e) => {
					onChange(e);
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
