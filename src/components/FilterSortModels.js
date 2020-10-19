import React from 'react';

const FilterSortModels = ({ store }) => {
	return (
		<div className="control row">
			<div className="select col">
				<select
					className="form-control"
					onChange={(e) => {
						store.vehicleModelStore.handleModelSort(e.target.value);
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
						store.vehicleModelStore.onChange(e);
					}}
					placeholder="Filter by"
					type="text"
					className="form-control"
				/>
			</div>
		</div>
	);
};

export default FilterSortModels;
