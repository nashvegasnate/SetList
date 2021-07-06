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

export default function SingleList({ user, lists }) {
  const [songs, setSongs] = useState([]);
  const { listId } = useParams();

  useEffect(() => {
    listsWithSongs(user?.uid, listId).then((response) => setSongs(response));
  }, []);

  return (
    <div className="singleLists-page">
    <SongContainer className="single-list-container" id="single-list-cards">
      {songs?.map((listSongsInfo) => (
        listSongsInfo?.firebaseKey
         && <SongCard
        key={listSongsInfo?.firebaseKey}
        user={user}
        setSongs={setSongs}
        lists={lists}
        {...listSongsInfo}
        listId={listId}
        singleCard={true}
        // id={id}
        />
      ))}
    </SongContainer>
    </div>
  );
}

SingleList.propTypes = {
  user: PropTypes.any,
  lists: PropTypes.array.isRequired
};
