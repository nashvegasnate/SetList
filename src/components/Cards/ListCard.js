import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardSubtitle,
  CardImg
} from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { deleteListSongs, listsWithSongs } from '../../helpers/data/ListSongsData';
// import { getSongs } from '../../helpers/data/SongsData';
import EditListForm from '../Forms/EditListForm';

function ListCard({
  list,
  user,
  setLists,
  setSongs,
  firebaseKey,
  ...lists
}) {
  const [updating, setUpdating] = useState(false);

  const handleSubmit = (type) => {
    switch (type) {
      case 'delete':
        deleteListSongs(list.firebaseKey, user.uid)
          .then(setLists)
          .then(() => listsWithSongs(user.uid))
          .then(setSongs);
        break;
      case 'update':
        setUpdating((prevState) => !prevState);
        break;
      default: console.warn('nothing selected');
    }
  };

  const history = useHistory();
  const handleClick = () => {
    history.push(`listSongs/${list.firebaseKey}`);
  };

  const ListSheet = styled.div`
  width: 250px;
  height: 400px;
  margin: 15px;
  box-shadow: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 5px;
`;

  return (
    <ListSheet>
      <Card body id="listCard" key={firebaseKey}>
        <CardImg id="cardImg" height="auto" src={list?.image}></CardImg>
        <CardSubtitle tag="h5" className="text-center mt-1 mb-3">{list?.title}</CardSubtitle>
        <div className='btn-group-md justify-content-between'>
          <Button className='btn-md' color="danger" onClick={() => handleSubmit('delete')}><i className="far fa-trash-alt fa-lg"></i></Button>
          <Button className='btn-md mr-1 ml-5 p-2' color="primary" onClick={() => handleClick()}><i className="fas fa-music fa-lg"></i></Button>
          <Button className='btn-md p-2 ml-1 mt-2' color="info" onClick={() => handleSubmit('update')}>
        {updating ? 'Close Form' : 'Edit List'}
      </Button>
        </div>
        {
          updating && <EditListForm
          formTitle='Edit List'
          setLists={setLists}
          user={user}
          lists={lists}
          setSongs={setSongs}
          image={list.image}
          title={list.title}
          firebaseKey={firebaseKey}
          />
        }
      </Card>
    </ListSheet>
  );
}

ListCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  // image: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  setLists: PropTypes.func.isRequired,
  setSongs: PropTypes.func.isRequired,
  // handleClick: PropTypes.func.isRequired,
  user: PropTypes.any,
  list: PropTypes.object.isRequired,
  // uid: PropTypes.string.isRequired,
};

export default ListCard;
