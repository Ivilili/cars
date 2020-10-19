import React from 'react';

const Pagination = ({ store }) => {
	return (
		<div className="pagination">
			<button
				className="page-btn"
				onClick={() => store.storeInstance.previousPage(store.storeInstance.firstVisible)}
			>
				&#8592; Previous Page
			</button>
			<button className="page-btn" onClick={() => store.storeInstance.nextPage(store.storeInstance.cursor)}>
				Next Page &#8594;
			</button>
		</div>
	);
};

export default Pagination;
