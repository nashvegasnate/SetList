import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardSubtitle,
  CardLink
} from 'reactstrap';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { GiMusicalScore, GiTrashCan } from 'react-icons/gi';
// import { Button } from 'reactstrap';
import { deleteSingleSong, deleteSong, getSongs } from '../../helpers/data/SongsData';
import EditSongForm from '../Forms/EditSongForm';
import { deleteSongFromList } from '../../helpers/data/ListSongsData';
// import { getSongs } from '../../helpers/data/SongsData';

function SongCard({
  user,
  setSongs,
  firebaseKey,
  lists,
  listId,
  singleCard,
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
        console.warn(firebaseKey);
        console.warn(user.uid);
        break;
      case 'singleDelete':
        deleteSingleSong(firebaseKey, user.uid, listId).then(setSongs);
        deleteSongFromList(firebaseKey, user.uid);
        break;
      case 'update':
        setUpdating((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };
  console.warn(lists);

  const SongSheet = styled.div`
  justify-content: space-evenly;
  width: 250px;
  height: 250px;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 10px;
`;

  return (
    <SongSheet>
      <Card body id="songCard" key={firebaseKey}>
        <CardSubtitle tag="h3" className="text-center mt-1 mb-3">{song?.title}</CardSubtitle>
        <CardLink id="cardImg" href={song?.image}>
          <IconContext.Provider value={{ color: 'blue', size: '2em', className: 'global-class-name' }}>
            <div>
              <GiMusicalScore />
            </div>
          </IconContext.Provider>
        </CardLink>
        <CardSubtitle tag="h5" className="text-center mt-1 mb-3">{song?.text}</CardSubtitle>
        <div className='btn-group-md justify-content-between'>
          {
            singleCard ? <Button className='btn-md mr-1 ml-5 p-2' color="danger" onClick={() => handleClick('singleDelete')}><i className="far fa-trash-alt fa-lg"></i></Button>
              : <Button className='btn-md mr-1 ml-5 p-2' color="danger" onClick={() => handleClick('delete')}><IconContext.Provider value={{ color: 'white', size: '1.5em', className: 'global-class-name' }}>
              <div>
                <GiTrashCan />
              </div>
            </IconContext.Provider></Button>
          }
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
        listId={listId}
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
  song: PropTypes.object.isRequired,
  listId: PropTypes.string,
  singleCard: PropTypes.bool
};

export default SongCard;
