import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardSubtitle,
  CardImg
} from 'reactstrap';
// import { Button } from 'reactstrap';
import styled from 'styled-components';
import { deleteSong } from '../../helpers/data/SongsData';
import EditSongForm from '../Forms/EditSongForm';
// import { getSongs } from '../../helpers/data/SongsData';

function SongCard({
  user,
  song,
  setSongs,
  firebaseKey,
  title,
  lists
}) {
  const [updating, setUpdating] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteSong(song.firebaseKey, user.uid)
          .then(setSongs);
        // .then(() => getSongs(user.uid))
        // .then(setSongs);
        break;
      case 'update':
        setUpdating((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  // const history = useHistory();
  // const handleClick = () => {
  //   history.push(`songs/${song.firebaseKey}`);
  // };

  const SongSheet = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  box-shadow: 50px;
`;

  return (
    <SongSheet>
      <Card body id="songCard" key={firebaseKey}>
        <CardImg id="cardImg" src={song.image}></CardImg>
        <CardSubtitle tag="h5" className="text-center mt-1 mb-3">{song.title}</CardSubtitle>
        <div className='btn-group-md justify-content-between'>
        <Button className='btn-md mr-1 ml-5 p-2' color="danger" onClick={() => handleClick('delete')}><i className="far fa-trash-alt"></i></Button>
        <Button className='btn-md p-2 ml-1' color="info" onClick={() => handleClick('update')}>
        {updating ? 'Close Form' : 'Edit Song'}
      </Button>
      </div>
      {
        updating && <EditSongForm
        formTitle='Update Song'
        setSongs={setSongs}
        firebaseKey={firebaseKey}
        user={user}
        title={title}
        lists={lists}
        // image={image}
        // text={text}
        // uid={uid}
        // listId={listId}
        />
      }
    </Card>
  </SongSheet>
  );
}

SongCard.propTypes = {
  firebaseKey: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  user: PropTypes.any,
  setSongs: PropTypes.func,
  lists: PropTypes.array,
  text: PropTypes.string,
  uid: PropTypes.string,
  listId: PropTypes.string,
  song: PropTypes.object
};

export default SongCard;
