import React, { useContext } from 'react';
import { StoreContext } from '../index';

const Pagination = () => {
	const store = useContext(StoreContext);
	return (
		<div className="pagination">
			<button className="page-btn" onClick={() => store.previousPage(store.firstVisible)}>
				&#8592; Previous Page
			</button>
			<button className="page-btn" onClick={() => store.nextPage(store.cursor)}>
				Next Page &#8594;
			</button>
		</div>
	);
};

export default Pagination;
