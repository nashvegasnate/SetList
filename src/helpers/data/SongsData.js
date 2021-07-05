// import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
// GET SONGS
const getSongs = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/songs.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

// DELETE SONGS
const deleteSong = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/songs/${firebaseKey}.json`)
    .then(() => getSongs(uid).then((songsArray) => resolve(songsArray)))
    .catch((error) => reject(error));
});
// CREATE NEW SONG
const createSong = (songObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/songs.json`, songObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/songs/${response.data.name}.json`, body)
        .then(() => {
          getSongs(uid).then((songsArray) => resolve(songsArray));
        });
    }).catch((error) => reject(error));
});
// RETRIEVE A SINGLE SONG IN ORDER TO EDIT/UPDATE
const getSingleSong = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/songs/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
// UPDATE A SONG'S INFO IN REAL TIME
const updateSong = (uid, firebaseKey, songObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/songs/${firebaseKey}.json`, songObject)
    .then(() => getSongs(uid)).then((songsArray) => resolve(songsArray))
    .catch((error) => reject(error));
});

// GET SONGS THAT BELONG TO SINGLE LIST
const getListSongs = (listId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/listSongs.json?orderBy="listId"&equalTo="${listId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// GET SONGS FROM SINGLE LIST TO UPDATE
const listsWithSongsUpdate = (uid, listId) => new Promise((resolve, reject) => {
  const songs = getSongs(uid);
  const listSongs = getListSongs(listId);
  Promise.all([songs, listSongs])
    .then(([songsResponse, listSongsResponse]) => {
      const listRelationshipsArray = listSongsResponse.filter((sl) => sl.listId === listId);

      const songInfoArray = listRelationshipsArray.map((listRelationship) => songsResponse.find((song) => song.firebaseKey === listRelationship.songId));
      resolve(songInfoArray);
    }).catch((error) => reject(error));
});

// UPDATE SONGS THAT BELONG TO A SINGLE LIST
const updateListSong = (listId, uid, firebaseKey, songObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/songs/${firebaseKey}.json`, songObject)
    .then(() => listsWithSongsUpdate(uid, listId)).then((songsArray) => resolve(songsArray))
    .catch((error) => reject(error));
});

// SEARCH SONGS
const searchSongs = (uid, searchValue) => new Promise((resolve, reject) => {
  getSongs(uid).then((response) => {
    resolve(response.filter((song) => song.title.toLowerCase().includes(searchValue)));
  })
    .catch((error) => reject(error));
});

export {
  getSongs,
  deleteSong,
  createSong,
  getSingleSong,
  updateSong,
  getListSongs,
  searchSongs,
  updateListSong,
  listsWithSongsUpdate
};
