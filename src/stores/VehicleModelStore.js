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

	//form input
	onChangeInput = (e) => {
		const { name, value } = e.target;
		this.setFormValues({ ...this.formValues, [name]: value });
	};
	//form data submit
	handleSubmit = (e) => {
		e.preventDefault();
		vehicleModelService.onCreateOrEditModel(this.formValues);
	};

	getModels() {
		vehicleModelService.getModels();
	}

	onCreateOrEditModel(dataObject) {
		vehicleModelService.onCreateOrEditModel(dataObject);
	}
	onDeleteModel(id) {
		vehicleModelService.onDeleteModel(id);
	}
}

decorate(VehicleModelStore, {
	activeVehicle: observable,
	formValues: observable,
	getModels: action,
	onCreateOrEditModel: action,
	onDeleteModel: action,
	handleClick: action,
	handleSubmit: action
});

const vehicleModelStore = new VehicleModelStore();
export default vehicleModelStore;
