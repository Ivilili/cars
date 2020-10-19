import { decorate, observable, action, computed } from 'mobx';
import vehicleService from '../services/VehicleService';

class VehicleStore {
	data = [];
	values = {
		name: '',
		abrv: ''
	};
	search = '';
	currentId = '';
	currentPage = 1;
	carsPerPage = 8;
	cursor = null;
	firstVisible = null;

	setValues(values) {
		this.values = values;
	}

	fetchData() {
		vehicleService.fetchData();
	}

	onCreateOrEdit() {
		vehicleService.onCreateOrEdit();
	}
	async onDelete(id) {
		await vehicleService.onDelete(id);
	}
	nextPage(cursor) {
		vehicleService.nextPage(cursor);
	}
	previousPage(firstVisible) {
		vehicleService.previousPage(firstVisible);
	}

	//sort data
	handleSort(value) {
		if (value === 'asc') {
			const AscCars = this.filtered.slice().sort((a, b) => (a.name > b.name ? 1 : -1));
			this.data = AscCars;
		} else if (value === 'desc') {
			const DescCars = this.filtered.slice().sort((a, b) => (a.name < b.name ? 1 : -1));
			this.data = DescCars;
		}
	}

	getId = (id) => {
		this.currentId = id;
	};

	onChange = (e) => {
		e.preventDefault();
		this.search = e.target.value;
	};

	//filter data
	get filtered() {
		const items = this.data.filter((item) => {
			return (
				item.name.toLowerCase().includes(this.search.toLowerCase()) ||
				item.abrv.toLowerCase().includes(this.search.toLowerCase())
			);
		});
		if (items.length) return items;
		return this.data;
	}
	//form input
	onChangeInput = (e) => {
		const { name, value } = e.target;
		this.setValues({ ...this.values, [name]: value });
	};
	//form data submit
	handleSubmit = (e) => {
		e.preventDefault();
		vehicleService.onCreateOrEdit(this.values);
	};
}

decorate(VehicleStore, {
	data: observable,
	search: observable,
	values: observable,
	currentPage: observable,
	carsPerPage: observable,
	cursor: observable,
	firstVisible: observable,
	filtered: computed,
	handleSort: action,
	fetchData: action,
	onCreateOrEdit: action,
	onDelete: action,
	nextPage: action,
	previousPage: action,
	setValues: action
});

const storeInstance = new VehicleStore();
export default storeInstance;
