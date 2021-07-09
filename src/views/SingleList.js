// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import SongCard from '../components/Cards/SongCard';
// import { listsAndSongs } from '../helpers/data/ListSongsData';

// export default function SingleList({ user }) {
//   const [listSongs, setListSongs] = useState([]);

//   useEffect(() => {
//     listsAndSongs(listSongs.id).then(setListSongs);
//   }, []);

//   return (
//     <>
//     <div className="single=list-container" id="single-list-cards">
//       {listSongs?.map((listSongsInfo) => (
//         <SongCard
//         key={listSongsInfo.id}
//         listSongs={listSongsInfo}
//         user={user}
//         setListSongs={setListSongs}
//         />
//       ))}
//     </div>
//     </>
//   );
// }

// SingleList.propTypes = {
//   user: PropTypes.any
// };
