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
  margin-top: 5%;
`;
function Songs({ user }) {
  const [songs, setSongs] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };
  // const [lists, setLists] = useState([]);

  useEffect(() => {
    getSongs(user?.uid).then(setSongs);
  }, []);

  return (
    <>
    <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color='danger' onClick={handleClick}>Add Song</Button>
        : <div>
        <Button className="m-2 btn-lg" color='info' onClick={handleClick}>Close</Button>
        <AddSongForm className="justify-content-center mt-3" setSongs={setSongs} user={user} songs={songs}/>
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
      />
      ))}
      </SongContainer>
    </>
  );
}

Songs.propTypes = {
  user: PropTypes.any,
};
export default Songs;
