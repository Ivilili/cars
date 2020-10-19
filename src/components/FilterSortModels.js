import React from 'react';

const FilterSortModels = ({ store }) => {
	return (
		<div>
			<div className="control">
				<div className="select">
					<select
						className="sort_section"
						onChange={(e) => {
							store.vehicleModelStore.handleModelSort(e.target.value);
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
					store.vehicleModelStore.onChange(e);
				}}
				placeholder="Filter by"
				type="text"
				className="filter_input"
			/>
		</div>
	);
};

export default FilterSortModels;
