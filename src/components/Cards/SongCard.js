import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { deleteSong } from '../../helpers/data/SongsData';
import EditSongForm from '../Forms/EditSongForm';

const SongCard = ({
  image,
  title,
  text,
  firebaseKey,
  user,
  setSongs,
  // listId,
  lists,
  uid
}) => {
  const [updating, setUpdating] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteSong(firebaseKey, user.uid)
          .then(setSongs);
        break;
      case 'update':
        setUpdating((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <div className='card' key={firebaseKey}>
      <div className='card-body'>
        <h5 tag="h5" className="card-link mt-2">{title}</h5>
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
        image={image}
        text={text}
        uid={uid}
        />
      }
    </div>
  </div>
  );
};

SongCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  firebaseKey: PropTypes.string,
  user: PropTypes.any,
  setSongs: PropTypes.func,
  lists: PropTypes.array,
  text: PropTypes.string,
  uid: PropTypes.string.isRequired
};

export default SongCard;
