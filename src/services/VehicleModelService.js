import firebase from '../utilities/firebase';
import { runInAction } from 'mobx';
import routingStore from '../stores/RouterStore';
import storeInstance from '../stores/VehicleStore';
import vehicleModelStore from '../stores/VehicleModelStore';

class VehicleModelService {
	//get models
	getModels = async () => {
		await firebase
			.firestore()
			.collection('VehicleMake')
			.doc(routingStore.history.location.state.id)
			.collection('models')
			.orderBy('model', 'desc')
			.limit(vehicleModelStore.modelsPerPage)
			.onSnapshot((documentSnapshots) => {
				if (documentSnapshots.docs.length !== 0) {
					let models = [];
					let firstVisible = documentSnapshots.docs[0];
					let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
					documentSnapshots.docs.forEach((doc) => {
						models.push({ ...doc.data(), id: doc.id });
					});
					runInAction(() => {
						vehicleModelStore.activeVehicle = models;
						vehicleModelStore.lastVisible = lastVisible;
						vehicleModelStore.firstVisible = firstVisible;
					});
				}
			});
	};

	//paging models
	nextModelPage = (lastVisible) => {
		let next = firebase
			.firestore()
			.collection('VehicleMake')
			.doc(routingStore.history.location.state.id)
			.collection('models')
			.orderBy('model', 'desc')
			.startAfter(lastVisible)
			.limit(vehicleModelStore.modelsPerPage);
		next.onSnapshot((documentSnapshots) => {
			if (documentSnapshots.docs.length !== 0) {
				let models = [];
				let firstVisible = documentSnapshots.docs[0];
				let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
				documentSnapshots.docs.forEach((doc) => {
					models.push({ ...doc.data(), id: doc.id });
				});
				runInAction(() => {
					vehicleModelStore.activeVehicle = models;
					vehicleModelStore.lastVisible = lastVisible;
					vehicleModelStore.firstVisible = firstVisible;
				});
			}
		});
	};

	previousModelPage = (firstVisible) => {
		let prev = firebase
			.firestore()
			.collection('VehicleMake')
			.doc(routingStore.history.location.state.id)
			.collection('models')
			.orderBy('model', 'desc')
			.endBefore(firstVisible)
			.limitToLast(vehicleModelStore.modelsPerPage);
		prev.onSnapshot((documentSnapshots) => {
			if (documentSnapshots.docs.length !== 0) {
				let models = [];
				let firstVisible = documentSnapshots.docs[0];
				let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
				documentSnapshots.docs.forEach((doc) => {
					models.push({ ...doc.data(), id: doc.id });
				});
				runInAction(() => {
					vehicleModelStore.activeVehicle = models;
					vehicleModelStore.lastVisible = lastVisible;
					vehicleModelStore.firstVisible = firstVisible;
				});
			}
		});
	};

	//onCreate model
	onCreateModel = async (dataObject) => {
		try {
			await firebase
				.firestore()
				.collection('VehicleMake')
				.doc(routingStore.history.location.state.makeId)
				.collection('models')
				.add(dataObject);
			alert('Model successfully added!');
		} catch (error) {
			console.error(error);
		}
	};

	//onEditModel
	onEditModel = async (dataObject) => {
		try {
			await firebase
				.firestore()
				.collection('VehicleMake')
				.doc(routingStore.history.location.state.makeId)
				.collection('models')
				.doc(storeInstance.currentId)
				.update(dataObject);
			alert('Vehicle successfully updated!');
		} catch (error) {
			console.error(error);
		}
	};
	//delete model
	onDeleteModel = async (id) => {
		await firebase
			.firestore()
			.collection('VehicleMake')
			.doc(routingStore.history.location.state.id)
			.collection('models')
			.doc(id)
			.delete()
			.then(function() {
				alert('Model successfully deleted!');
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
			});
	};
}

const vehicleModelService = new VehicleModelService();
export default vehicleModelService;
