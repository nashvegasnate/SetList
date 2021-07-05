// import firebase from 'firebase/app';
// import axios from 'axios';
// import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { deleteList, getSingleList } from './ListsData';
import { deleteSong, getListSongs, getSongs } from './SongsData';

const dbUrl = firebaseConfig.databaseURL;

// const getListSongs = () => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/listSongs.json`)
//     .then((response) => resolve(Object.values(response.data)))
//     .catch((error) => reject(error));
// });

const listsWithSongs = (uid, listId) => new Promise((resolve, reject) => {
  const songs = getSongs(uid);
  const listSongs = getListSongs(listId);
  Promise.all([songs, listSongs])
    .then(([songsResponse, listSongsResponse]) => {
      const listRelationshipsArray = listSongsResponse.filter((sl) => sl.listId === listId);

      const songInfoArray = listRelationshipsArray.map((listRelationship) => songsResponse.find((song) => song.firebaseKey === listRelationship.songId));
      resolve(songInfoArray);
    }).catch((error) => reject(error));
});

// ADD A SONG TO A LIST
const addSongList = (object) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/listSongs.json`, object)
    .then((response) => {
      const body = { id: response.data.name };
      axios.patch(`${dbUrl}/listSongs/${response.data.name}.json`, body)
        .then(() => {
          listsWithSongs(object.uid, object.listId).then(resolve);
        });
    })
    .catch((error) => reject(error));
});

// DELETE ALL THE SONGS BELONGING TO A SPECIFIED LIST
const deleteListSongs = (firebaseKey, uid) => new Promise((resolve, reject) => {
  getListSongs(firebaseKey).then((listSongsArray) => {
    const deleteSongs = listSongsArray.map((songs) => deleteSong(songs.firebaseKey, uid));
    Promise.all(deleteSongs).then(() => resolve(deleteList(firebaseKey, uid)));
  }).catch((error) => reject(error));
});

// SHOW SONGS ASSOCIATED WITH SINGLE LIST
const listsAndSongs = (firebaseKey) => new Promise((resolve, reject) => {
  const list = getSingleList(firebaseKey);
  const listSongs = getListSongs(firebaseKey);
  Promise.all([list, listSongs])
    .then(([listResponse, listSongsResponse]) => resolve({ list: listResponse, songs: listSongsResponse }))
    .catch((error) => reject(error));
});

// DELETE SONGS FROM LIST
const deleteSongFromList = (songId, uid) => new Promise((resolve, reject) => {
  const theArray = [];
  axios.get(`${dbUrl}/listSongs.json?orderBy="songId"&equalTo="${songId}"`)
    .then((response) => theArray.push(response))
    .then(() => {
      const deleteListSong = theArray.map((lists) => deleteSong(lists.songId, uid));
      Promise.all(deleteListSong).then(resolve);
    })
    .catch((error) => reject(error));
});

export {
  deleteListSongs,
  listsAndSongs,
  listsWithSongs,
  addSongList,
  deleteSongFromList
};
