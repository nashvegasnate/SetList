import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardSubtitle,
  CardLink
} from 'reactstrap';
// import { Button } from 'reactstrap';
import styled from 'styled-components';
import { deleteSong, getSongs } from '../../helpers/data/SongsData';
import EditSongForm from '../Forms/EditSongForm';
// import { getSongs } from '../../helpers/data/SongsData';

function SongCard({
  user,
  setSongs,
  firebaseKey,
  lists,
  ...song
}) {
  const [updating, setUpdating] = useState(false);
  // const history = useHistory();
  // const handleClick = () => {
  //   history.push(`songs/${song.firebaseKey}`);
  // };

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteSong(firebaseKey, user.uid)
          // .then(setSongs);
          .then(() => getSongs(user.uid))
          .then(setSongs);
        break;
      case 'update':
        setUpdating((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  const SongSheet = styled.div`
  width: 250px;
  height: 200px;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 10px;
`;

  return (
    <SongSheet>
      <Card body id="songCard" key={firebaseKey}>
        <CardSubtitle tag="h3" className="text-center mt-1 mb-3">{song?.title}</CardSubtitle>
        <CardLink id="cardImg" href={song?.image}>Chart Link</CardLink>
        <CardSubtitle tag="h5" className="text-center mt-1 mb-3">{song?.text}</CardSubtitle>
        <div className='btn-group-md justify-content-between'>
        <Button className='btn-md mr-1 ml-5 p-2' color="danger" onClick={() => handleClick('delete')}><i className="far fa-trash-alt"></i></Button>
        <Button className='btn-md p-2 ml-1' color="info" onClick={() => handleClick('update')}>
        {updating ? 'Close Form' : 'Edit Song'}
      </Button>
      </div>
      {
        updating && <EditSongForm
        formTitle='Edit Song'
        setSongs={setSongs}
        firebaseKey={firebaseKey}
        user={user}
        title={song.title}
        lists={lists}
        // song={song}
        image={song.image}
        text={song.text}
        // uid={uid}
        // listId={listId}
        {...song}
        />
      }
    </Card>
  </SongSheet>
  );
}

SongCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.any,
  setSongs: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  song: PropTypes.object.isRequired
};

export default SongCard;
