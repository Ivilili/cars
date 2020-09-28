import { decorate, observable, action, runInAction } from 'mobx';
import firebase from '../utilities/firebase';

class VehicleStore {
	data = [];
	search = '';

	currentPage = 1;
	carsPerPage = 8;

	fetchData = async () => {
		firebase.firestore().collection('VehicleMake').onSnapshot((querySnapshot) => {
			let docs = [];
			querySnapshot.forEach((doc) => {
				docs.push({ ...doc.data(), id: doc.id });
			});
			runInAction(() => {
				this.data = docs;
			});
		});
	};

	onDelete = async (id) => {
		await firebase.firestore().collection('VehicleMake').doc(id).delete().catch((err) => {
			console.error(err);
		});
		console.log('car deleted');
	};

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
	fetchData: action,
	onDelete: action
});

const storeInstance = new VehicleStore();
export default storeInstance;
