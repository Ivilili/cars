import React from 'react';
import './Pagination.css';

const Pagination = ({ carsPerPage, totalCars, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<button onClick={() => paginate(number)} className="page-btn">
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
