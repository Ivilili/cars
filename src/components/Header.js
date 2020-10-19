import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ store }) => {
	return (
		<div className="jumbotron header">
			<h1 className="main_title display-4">Mono Vehicles</h1>
			<p className="main_desc lead">Simple application with React, Firebase and Mobx</p>
			<Link
				to={{
					pathname: `/addOrEdit`
				}}
			>
				<button className="add-btn">Add a Vehicle</button>
			</Link>
			<div className="control row">
				<div className="select col">
					<select
						className="form-control"
						onChange={(e) => {
							store.storeInstance.handleSort(e.target.value);
						}}
					>
						<option defaultValue="sort">Sort by</option>
						<option value="asc">A-Z</option>
						<option value="desc">Z-A</option>
					</select>
				</div>
				<div className="col">
					<input
						onChange={(e) => {
							store.storeInstance.onChange(e);
						}}
						placeholder="Filter by"
						type="text"
						className="form-control"
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
