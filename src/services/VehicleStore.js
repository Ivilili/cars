import { decorate, observable, action, runInAction } from 'mobx';
import firebase from '../utilities/firebase';

class VehicleStore {
	data = [];
	search = '';
	currentId = '';
	currentPage = 1;
	carsPerPage = 8;
	cursor = null;
	firstVisible = null;

	//get data
	fetchData = () => {
		firebase
			.firestore()
			.collection('VehicleMake')
			.orderBy('name', 'desc')
			.limit(this.carsPerPage)
			.onSnapshot(this.handleSnapshot);
	};

	handleSnapshot = (documentSnapshots) => {
		if (documentSnapshots.docs.length !== 0) {
			let vehicles = [];
			let firstVisible = documentSnapshots.docs[0];
			let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

			documentSnapshots.docs.forEach((doc) => {
				vehicles.push({ ...doc.data(), id: doc.id });
			});
			runInAction(() => {
				this.data = vehicles;
				this.cursor = lastVisible;
				this.firstVisible = firstVisible;
			});
		}
	};
	//create or edit data
	onCreateOrEdit = async (dataObject) => {
		try {
			if (this.currentId === '') {
				await firebase.firestore().collection('VehicleMake').doc().set(dataObject);
				alert('Vehicle successfully added!');
			} else {
				await firebase.firestore().collection('VehicleMake').doc(this.currentId).update(dataObject);
				alert('Vehicle successfully updated!');
				runInAction(() => {
					this.currentId = '';
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	//delete data by id
	onDelete = async (id) => {
		await firebase.firestore().collection('VehicleMake').doc(id).delete().catch((err) => {
			console.error(err);
		});
	};

	//paging
	nextPage = (cursor) => {
		let next = firebase
			.firestore()
			.collection('VehicleMake')
			.orderBy('name', 'desc')
			.startAfter(cursor)
			.limit(this.carsPerPage);
		next.onSnapshot(this.handleSnapshot);
	};

	previousPage = (firstVisible) => {
		let prev = firebase
			.firestore()
			.collection('VehicleMake')
			.orderBy('name', 'desc')
			.endBefore(firstVisible)
			.limitToLast(this.carsPerPage);
		prev.onSnapshot(this.handleSnapshot);
	};

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
}

decorate(VehicleStore, {
	data: observable,
	search: observable,
	currentPage: observable,
	carsPerPage: observable,
	fetchData: action,
	onDelete: action,
	previousPage: action,
	nextPage: action,
	handleSnapshot: action,
	onCreateOrEdit: action,
	handleSort: action
});

const storeInstance = new VehicleStore();
export default storeInstance;
