import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/auth';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// GET THE LISTS
const getLists = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/lists.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// ACCESS SINGLE LIST
const getSingleList = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/lists/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// DELETE LIST
const deleteList = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/lists/${firebaseKey}.json`)
    .then(() => getLists(uid).then((listsArray) => resolve(listsArray)))
    .catch((error) => reject(error));
});

// CREATE NEW LIST
const createList = (listObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/lists.json`, listObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/lists/${response.data.name}.json`, body)
        .then(() => {
          getLists(uid).then((listsArray) => resolve(listsArray));
        });
    }).catch((error) => reject(error));
});

// UPDATE A LISTS'S INFO IN REAL TIME
const updateList = (firebaseKey, listObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/lists/${firebaseKey}.json`, listObject)
    .then(() => getLists(firebase.auth().currentUser.uid)).then((listsArray) => resolve(listsArray))
    .catch((error) => reject(error));
});
export {
  getLists,
  getSingleList,
  deleteList,
  createList,
  updateList
};
