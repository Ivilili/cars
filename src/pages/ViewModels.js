import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListModels from '../components/ListModels';
import AddModelForm from '../components/AddModelForm';
import vehicleModelStore from '../store/VehicleModelStore';
import storeInstance from '../store/VehicleStore';
import routingStore from '../store/RouterStore';
import '../styles/main.css';

class ViewModels extends React.Component {
	state = {
		model: '',
		make: '',
		horsepower: ''
	};
	componentDidMount() {
		vehicleModelStore.getModels();
	}

	onChangeInput = (e) => {
		const { name, value } = e.target;
		this.setState({ ...this.state, [name]: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		vehicleModelStore.onCreateOrEditModel(this.state);
	};

	handleClick = (id) => {
		storeInstance.currentId = id;
	};

	render() {
		return (
			<Fragment>
				<Link className="go-back-link" to={{ pathname: `/` }}>
					&#8592; Go Back
				</Link>
				<h2 className="models-title">{routingStore.history.location.state.item} Models</h2>
				<AddModelForm
					handleClick={this.handleClick}
					handleSubmit={this.handleSubmit}
					onChangeInput={this.onChangeInput}
					models={this.state}
				/>
				<ListModels handleClick={this.handleClick} />
			</Fragment>
		);
	}
}

export default ViewModels;
