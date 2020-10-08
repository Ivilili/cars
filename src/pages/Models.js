import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { StoreContext } from '../index';
import firebase from '../utilities/firebase';
import './List.css';

const Models = observer((props) => {
	const store = useContext(StoreContext);
	const refInput = useRef(null);

	const modelFormData = {
		model: '',
		make: '',
		horsepower: ''
	};

	const [ models, setModels ] = useState(modelFormData);

	useEffect(() => {
		getModels();
		// eslint-disable-next-line
	}, []);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setModels({ ...models, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onCreateOrEditModel(models);
		setModels({ ...modelFormData });
	};

	const handleClick = (id) => {
		store.currentId = id;
		refInput.current.focus();
	};

	const getModels = async () => {
		await firebase
			.firestore()
			.collection('VehicleMake')
			.doc(props.location.state.id)
			.collection('models')
			.get()
			.then((querySnapshot) => {
				let models = [];
				querySnapshot.forEach((doc) => {
					models.push({ ...doc.data(), id: doc.id });
				});
				store.activeVehicle = models;
			});
	};

	const onCreateOrEditModel = async (dataObject) => {
		try {
			if (store.currentId === '') {
				await firebase
					.firestore()
					.collection('VehicleMake')
					.doc(props.location.state.id)
					.collection('models')
					.add(dataObject);
				alert('Model successfully added!');
			} else {
				await firebase
					.firestore()
					.collection('VehicleMake')
					.doc(props.location.state.id)
					.collection('models')
					.doc(store.currentId)
					.update(dataObject);
				alert('Vehicle successfully updated!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onDeleteModel = async (id) => {
		await firebase
			.firestore()
			.collection('VehicleMake')
			.doc(props.location.state.id)
			.collection('models')
			.doc(id)
			.delete()
			.then(function() {
				alert('Model successfully deleted!');
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
			});
	};

	return (
		<Fragment>
			<Link className="go-back-link" to={{ pathname: `/` }}>
				&#8592; Go Back
			</Link>
			<h1 className="models-title">{props.location.state.item} Models</h1>
			<form className="add-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						id="model"
						ref={refInput}
						type="text"
						name="model"
						value={models.model}
						placeholder="Model"
						onChange={onChangeInput}
					/>
				</div>
				<div className="form-group">
					<input
						id="make"
						type="text"
						name="make"
						value={models.make}
						placeholder="Make"
						onChange={onChangeInput}
					/>
				</div>
				<div className="form-group">
					<input
						id="horsepower"
						type="number"
						name="horsepower"
						value={models.horsepower}
						placeholder="Horsepower"
						onChange={onChangeInput}
					/>
				</div>
				<button className="save-btn" type="submit">
					{store.currentId === '' ? 'Add Model' : 'Update Model'}
				</button>
			</form>
			<ul className="model_list">
				{store.activeVehicle.map((model) => (
					<li className="list_item" key={model.id}>
						<h3 className="list_item_title">{model.model}</h3>
						<div className="list_item_abrv">
							<span>make:</span> {model.make}
						</div>
						<div className="list_item_abrv">
							<span>horsepower:</span> {model.horsepower}
						</div>
						<div>
							<button className="edit-btn" onClick={() => handleClick(model.id)}>
								Edit
							</button>
							<button className="delete-btn" onClick={() => onDeleteModel(model.id)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</Fragment>
	);
});

export default Models;
