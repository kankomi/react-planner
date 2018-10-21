import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // make sure you add this for firestore
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import myReducers from './reducers';

// initialize firebase instance with config from console
const firebaseConfig = {
  apiKey: 'AIzaSyCjfa9_s_q2mbQv8ZQ0_2uQ9H2xUSVmyG8',
  authDomain: 'planner-8f958.firebaseapp.com',
  databaseURL: 'https://planner-8f958.firebaseio.com',
  projectId: 'planner-8f958',
  storageBucket: 'planner-8f958.appspot.com',
  messagingSenderId: '17506328551'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(firebaseConfig);

// Initialize Firestore with timeshot settings
firebase.firestore().settings({ timestampsInSnapshots: true });

// Add BOTH store enhancers when making store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

// Add firebase and firestore to reducers
const rootReducer = combineReducers({
  root: myReducers,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);
export default store;
