import { action, decorate, observable } from 'mobx';
import firebase from '../utilities/firebase';
import routingStore from './RouterStore';
import storeInstance from './VehicleStore';

class VehicleModelStore {
	activeVehicle = [];

	//get models
	getModels = async () => {
		await firebase
			.firestore()
			.collection('VehicleMake')
			.doc(routingStore.history.location.state.id)
			.collection('models')
			.get()
			.then((querySnapshot) => {
				let models = [];
				querySnapshot.forEach((doc) => {
					models.push({ ...doc.data(), id: doc.id });
				});
				this.activeVehicle = models;
			});
	};

	//create or edit a model
	onCreateOrEditModel = async (dataObject) => {
		try {
			if (storeInstance.currentId === '') {
				await firebase
					.firestore()
					.collection('VehicleMake')
					.doc(routingStore.history.location.state.id)
					.collection('models')
					.add(dataObject);
				alert('Model successfully added!');
			} else {
				await firebase
					.firestore()
					.collection('VehicleMake')
					.doc(routingStore.history.location.state.id)
					.collection('models')
					.doc(storeInstance.currentId)
					.update(dataObject);
				alert('Vehicle successfully updated!');
			}
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

decorate(VehicleModelStore, {
	models: observable,
	activeVehicle: observable,
	getModels: action,
	onCreateOrEditModel: action
});

const vehicleModelStore = new VehicleModelStore();
export default vehicleModelStore;
