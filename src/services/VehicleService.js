import firebase from '../utilities/firebase';
import { runInAction } from 'mobx';
import storeInstance from '../stores/VehicleStore';

class VehicleService {
	//get data
	fetchData = () => {
		firebase
			.firestore()
			.collection('VehicleMake')
			.orderBy('name', 'desc')
			.limit(storeInstance.carsPerPage)
			.onSnapshot((documentSnapshots) => {
				if (documentSnapshots.docs.length !== 0) {
					let vehicles = [];
					let firstVisible = documentSnapshots.docs[0];
					let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
					documentSnapshots.docs.forEach((doc) => {
						vehicles.push({ ...doc.data(), id: doc.id });
					});
					runInAction(() => {
						storeInstance.data = vehicles;
						storeInstance.cursor = lastVisible;
						storeInstance.firstVisible = firstVisible;
					});
				}
			});
	};

	//create or edit data
	onCreateOrEdit = async (dataObject) => {
		try {
			if (storeInstance.currentId === '') {
				await firebase.firestore().collection('VehicleMake').doc().set(dataObject);
				alert('Vehicle successfully added!');
			} else {
				await firebase.firestore().collection('VehicleMake').doc(storeInstance.currentId).update(dataObject);
				alert('Vehicle successfully updated!');
				runInAction(() => {
					storeInstance.currentId = '';
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
			.limit(storeInstance.carsPerPage);
		next.onSnapshot((documentSnapshots) => {
			if (documentSnapshots.docs.length !== 0) {
				let vehicles = [];
				let firstVisible = documentSnapshots.docs[0];
				let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
				documentSnapshots.docs.forEach((doc) => {
					vehicles.push({ ...doc.data(), id: doc.id });
				});
				runInAction(() => {
					storeInstance.data = vehicles;
					storeInstance.cursor = lastVisible;
					storeInstance.firstVisible = firstVisible;
				});
			}
		});
	};

	previousPage = (firstVisible) => {
		let prev = firebase
			.firestore()
			.collection('VehicleMake')
			.orderBy('name', 'desc')
			.endBefore(firstVisible)
			.limitToLast(storeInstance.carsPerPage);
		prev.onSnapshot((documentSnapshots) => {
			if (documentSnapshots.docs.length !== 0) {
				let vehicles = [];
				let firstVisible = documentSnapshots.docs[0];
				let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
				documentSnapshots.docs.forEach((doc) => {
					vehicles.push({ ...doc.data(), id: doc.id });
				});
				runInAction(() => {
					storeInstance.data = vehicles;
					storeInstance.cursor = lastVisible;
					storeInstance.firstVisible = firstVisible;
				});
			}
		});
	};
}

const vehicleService = new VehicleService();
export default vehicleService;
