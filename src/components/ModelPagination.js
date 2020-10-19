import React from 'react';

const ModelPagination = ({ store }) => {
	return (
		<div className="pagination">
			<button
				className="page-btn"
				onClick={() => store.vehicleModelStore.previousModelPage(store.vehicleModelStore.firstVisible)}
			>
				&#8592; Previous Page
			</button>
			<button
				className="page-btn"
				onClick={() => store.vehicleModelStore.nextModelPage(store.vehicleModelStore.lastVisible)}
			>
				Next Page &#8594;
			</button>
		</div>
	);
};

export default ModelPagination;
