import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import SongCard from '../components/Cards/SongCard';
// import { listsAndSongs } from '../helpers/data/ListSongsData';
import { listsWithSongs } from '../helpers/data/ListSongsData';

export default function SingleList({ user }) {
  const [listSongs, setListSongs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    listsWithSongs(listSongs.id).then(setListSongs);
  }, []);
  console.warn(listSongs);

  return (
    <>
    <div className="single-list-container" id="single-list-cards">
      {listSongs?.map((listSongsInfo) => (
        <SongCard
        key={listSongsInfo.id}
        listSongs={listSongsInfo}
        user={user}
        setListSongs={setListSongs}
        id={id}
        />
      ))}
    </div>
    </>
  );
}

SingleList.propTypes = {
  user: PropTypes.any
};
