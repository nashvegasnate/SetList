import { deleteList, getSingleList } from './ListsData';
import { deleteSong, getListSongs } from './SongsData';

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

export {
  deleteListSongs,
  listsAndSongs,
};
