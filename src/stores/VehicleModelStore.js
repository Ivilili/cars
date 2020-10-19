import { decorate, observable, action, computed } from 'mobx';
import vehicleModelService from '../services/VehicleModelService';

class VehicleModelStore {
	activeVehicle = [];
	formValues = {
		model: '',
		make: '',
		horsepower: ''
	};
	filter = '';
	setFormValues(formValues) {
		this.formValues = formValues;
	}
	handleSubmitEdit = (e) => {
		e.preventDefault();
		vehicleModelService.onEditModel(this.formValues);
	};

	onChange = (e) => {
		e.preventDefault();
		this.filter = e.target.value;
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

	handleModelSort = (value) => {
		if (value === 'asc') {
			const AscCars = this.filteredModels.slice().sort((a, b) => (a.model > b.model ? 1 : -1));
			this.activeVehicle = AscCars;
		} else if (value === 'desc') {
			const DescCars = this.filteredModels.slice().sort((a, b) => (a.model < b.model ? 1 : -1));
			this.activeVehicle = DescCars;
		}
	};

	get filteredModels() {
		const items = this.activeVehicle.filter((item) => {
			return item.model.toLowerCase().includes(this.filter.toLowerCase());
		});
		if (items.length) return items;
		return this.activeVehicle;
	}

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
	filter: observable,
	getModels: action,
	onCreateModel: action,
	onEditModel: action,
	onDeleteModel: action,
	handleClick: action,
	handleSubmit: action,
	handleModelSort: action,
	filteredModels: computed
});

const vehicleModelStore = new VehicleModelStore();
export default vehicleModelStore;
