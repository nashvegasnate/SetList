import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import SongCard from '../components/Cards/SongCard';
import AddSongForm from '../components/Forms/AddSongForm';

const SongContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;
export default function Songs({
  user, songs, setSongs, lists
}) {
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };
  return (
    <>
    <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color='danger' onClick={handleClick}>Add Song</Button>
        : <div>
        <Button className="m-2 btn-lg" color='info' onClick={handleClick}>Close</Button>
        <AddSongForm className="justify-content-center mt-3" setSongs={setSongs} user={user} lists={lists}/>
        </div>
      }
    </section>
      {/* <h1>This is the Songs page</h1> */}
      <SongContainer className="card-container align-content-center" id="list-songs">
      {songs?.map((song) => (
        <SongCard
        key={song.firebaseKey}
        user={user}
        setSongs={setSongs}
        lists={lists}
      />
      ))}
      </SongContainer>
    </>
  );
}

Songs.propTypes = {
  songs: PropTypes.array,
  setSongs: PropTypes.func,
  user: PropTypes.any,
  lists: PropTypes.array,
};
