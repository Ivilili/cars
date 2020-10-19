import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ store }) => {
	return (
		<div className="header">
			<h1 className="main_title">Mono Vehicles</h1>
			<p className="main_desc">Simple application with React and Mobx</p>
			<div className="control">
				<div className="select">
					<select
						className="sort_section"
						onChange={(e) => {
							store.storeInstance.handleSort(e.target.value);
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
					store.storeInstance.onChange(e);
				}}
				placeholder="Filter by"
				type="text"
				className="filter_input"
			/>
			<Link
				to={{
					pathname: `/addOrEdit`
				}}
			>
				<button className="add-btn">Add a Vehicle</button>
			</Link>
		</div>
	);
};

export default Header;
