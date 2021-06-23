import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import SongCard from '../components/Cards/SongCard';
// import { listsAndSongs } from '../helpers/data/ListSongsData';
import { listsWithSongs } from '../helpers/data/ListSongsData';

const SongContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 5px;
`;

export default function SingleList({ user }) {
  const [listSongs, setListSongs] = useState([]);
  const { listId } = useParams();

  useEffect(() => {
    listsWithSongs(user?.uid, listId).then((response) => setListSongs(response));
  }, []);
  console.warn(listSongs);

  return (
    <>
    <SongContainer className="single-list-container" id="single-list-cards">
      {listSongs?.map((listSongsInfo) => (
        <SongCard
        key={listSongsInfo?.firebaseKey}
        user={user}
        setListSongs={setListSongs}
        {...listSongsInfo}
        // id={id}
        />
      ))}
    </SongContainer>
    </>
  );
}

SingleList.propTypes = {
  user: PropTypes.any
};
