import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyCBdwEYYvg8peBhX-tXBxMboyav5L17_D4',
	authDomain: 'mono-vehicles.firebaseapp.com',
	databaseURL: 'https://mono-vehicles.firebaseio.com',
	projectId: 'mono-vehicles',
	storageBucket: 'mono-vehicles.appspot.com',
	messagingSenderId: '501619299960',
	appId: '1:501619299960:web:4d248449968a95c79aff8d',
	measurementId: 'G-MLZYD7CL3N'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
