import firebase from '../utilities/firebase';
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
			.get()
			.then((querySnapshot) => {
				let models = [];
				querySnapshot.forEach((doc) => {
					models.push({ ...doc.data(), id: doc.id });
				});
				vehicleModelStore.activeVehicle = models;
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
