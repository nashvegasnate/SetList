import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardSubtitle,
  CardImg
} from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { deleteListSongs } from '../../helpers/data/ListSongsData';
import { getSongs } from '../../helpers/data/SongsData';

function ListCard({
  image,
  title,
  firebaseKey,
  // uid,
  user,
  setLists,
  setSongs
}) {
  const handleDelete = (type) => {
    switch (type) {
      case 'delete':
        deleteListSongs(firebaseKey, user.uid)
          .then(setLists)
          .then(() => getSongs(user.uid))
          .then(setSongs);
        break;
      default: console.warn('nothing selected');
    }
  };

  const history = useHistory();
  const handleClick = () => {
    history.push(`lists/${firebaseKey}`);
  };

  const ListBoard = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  box-shadow: 50px;
`;

  return (
    <ListBoard>
      <Card body id="listCard">
        <CardImg id="cardImg" src={image}></CardImg>
        <CardSubtitle tag="h5" className="text-center mt-1 mb-3">{title}</CardSubtitle>
        <div className='btn-group-md justify-content-between'>
          <Button className='btn-md' color="danger" onClick={() => handleDelete('delete')}><i className="far fa-trash-alt"></i></Button>
          <Button className='btn-md mr-1 ml-5 p-2' color="info" onClick={() => handleClick()}>View Songs</Button>
        </div>
      </Card>
    </ListBoard>
  );
}

ListCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  setLists: PropTypes.func,
  setSongs: PropTypes.func,
  handleClick: PropTypes.func,
  user: PropTypes.any,
  // uid: PropTypes.string.isRequired
};

export default ListCard;
