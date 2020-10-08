import React, { Fragment, useState, useContext } from 'react';
import { StoreContext } from '../index';
import { Link } from 'react-router-dom';

const Edit = (props) => {
	const store = useContext(StoreContext);

	const formDate = { name: '', abrv: '' };

	const [ values, setValues ] = useState(formDate);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		store.onEdit(values);
		setValues({ ...formDate });
	};

	return (
		<Fragment>
			<div className="container">
				<h1>Edit a Vehicle</h1>
				<form className="add-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							id="name"
							type="text"
							name="name"
							value={values.name}
							placeholder={props.location.state.item}
							onChange={onChangeInput}
						/>
					</div>
					<div className="form-group">
						<input
							id="abrv"
							type="text"
							name="abrv"
							value={values.abrv}
							placeholder={props.location.state.abrv}
							onChange={onChangeInput}
						/>
					</div>

					<button className="save-btn" type="submit">
						Edit
					</button>
					<Link className="return-home-link" to={{ pathname: `/` }}>
						Return Home
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

export default Edit;
