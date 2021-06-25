import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { getSongs } from '../helpers/data/SongsData';
import SongCard from '../components/Cards/SongCard';
import AddSongForm from '../components/Forms/AddSongForm';

const SongContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 5px;
`;
function Songs({ user, lists }) {
  const [songs, setSongs] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };
  // const [lists, setLists] = useState([]);

  useEffect(() => {
    getSongs(user?.uid).then(setSongs);
    console.warn(getSongs);
  }, []);

  return (
    <div className="songs-page">
    <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color='primary' onClick={handleClick}>Add Song</Button>
        : <div>
        <Button className="m-2 btn-lg" color='info' onClick={handleClick}>Close</Button>
        <AddSongForm className="justify-content-center mt-3" lists={lists} setSongs={setSongs} user={user} songs={songs}/>
        </div>
      }
    </section>
      <SongContainer className="card-container align-content-center" id="list-songs">
      {songs?.map((songInfo) => (
        <SongCard
        key={songInfo.firebaseKey}
        song={songInfo}
        user={user}
        setSongs={setSongs}
        lists={lists}
        {...songInfo}
      />
      ))}
      </SongContainer>
    </div>
  );
}

Songs.propTypes = {
  user: PropTypes.any,
  lists: PropTypes.array.isRequired
};
export default Songs;
