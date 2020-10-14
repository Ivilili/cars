import React, { Fragment } from 'react';
import ListVehicles from './../components/ListVehicles';
import Pagination from './../components/Pagination';
import Header from './../components/Header';
import storeInstance from '../services/VehicleStore';
import '../styles/main.css';
import AddVehicleForm from '../components/AddVehicleForm';

class ViewVehicle extends React.Component {
	state = {
		name: '',
		abrv: ''
	};
	componentDidMount() {
		storeInstance.fetchData();
	}

	onChangeInput = (e) => {
		const { name, value } = e.target;
		this.setState({ ...this.state, [name]: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		storeInstance.onCreateOrEdit(this.state);
	};

	render() {
		return (
			<Fragment>
				<Header />
				<AddVehicleForm values={this.state} submit={this.handleSubmit} change={this.onChangeInput} />
				<ListVehicles />
				<Pagination />
			</Fragment>
		);
	}
}

export default ViewVehicle;
