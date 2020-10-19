import { decorate, observable, action } from 'mobx';
import vehicleModelService from '../services/VehicleModelService';

class VehicleModelStore {
	activeVehicle = [];
	formValues = {
		model: '',
		make: '',
		horsepower: ''
	};
	setFormValues(formValues) {
		this.formValues = formValues;
	}
	handleSubmitEdit = (e) => {
		e.preventDefault();
		vehicleModelService.onEditModel(this.formValues);
	};

	//form input
	onChangeInput = (e) => {
		const { name, value } = e.target;
		this.setFormValues({ ...this.formValues, [name]: value });
	};
	//form data submit
	handleSubmit = (e) => {
		e.preventDefault();
		vehicleModelService.onCreateModel(this.formValues);
	};

	getModels() {
		vehicleModelService.getModels();
	}

	onCreateModel(dataObject) {
		vehicleModelService.onCreateModel(dataObject);
	}

	onEditModel(dataObject) {
		vehicleModelService.onEditModel(dataObject);
	}
	onDeleteModel(id) {
		vehicleModelService.onDeleteModel(id);
	}
}

decorate(VehicleModelStore, {
	activeVehicle: observable,
	formValues: observable,
	getModels: action,
	onCreateModel: action,
	onEditModel: action,
	onDeleteModel: action,
	handleClick: action,
	handleSubmit: action
});

const vehicleModelStore = new VehicleModelStore();
export default vehicleModelStore;
