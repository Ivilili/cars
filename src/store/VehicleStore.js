import { decorate, observable, action, runInAction } from 'mobx';
import firebase from '../utilities/firebase';

class VehicleStore {
	data = [];
	search = '';

	currentPage = 1;
	carsPerPage = 8;

	async fetchData() {
		const myData = await firebase.firestore().collection('VehicleMake').get();
		runInAction(() => {
			this.data = myData.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
		});
	}

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

	get totalCars() {
		return this.data.length;
	}
}

decorate(VehicleStore, {
	data: observable,
	search: observable,
	currentPage: observable,
	carsPerPage: observable,
	fetchData: action
});

const storeInstance = new VehicleStore();
export default storeInstance;
