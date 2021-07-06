import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardSubtitle,
  CardImg
} from 'reactstrap';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { GiMusicalNotes, GiTrashCan } from 'react-icons/gi';
import PropTypes from 'prop-types';
import { deleteListSongs, listsWithSongs } from '../../helpers/data/ListSongsData';
// import { getSongs } from '../../helpers/data/SongsData';
import EditListForm from '../Forms/EditListForm';

function ListCard({
  list,
  user,
  setLists,
  // setSongs,
  // firebaseKey,
  // ...lists
}) {
  const [updating, setUpdating] = useState(false);

  const handleSubmit = (type) => {
    switch (type) {
      case 'delete':
        deleteListSongs(list.firebaseKey, user.uid)
          .then(setLists)
          .then(() => listsWithSongs(user.uid));
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
      <Card body id="listCard">
        <CardImg id="cardImg" height="auto" src={list?.image}></CardImg>
        <CardSubtitle tag="h5" className="text-center mt-1 mb-3">{list?.title}</CardSubtitle>
        <div className='btn-group-md justify-content-between'>
          <Button className='btn-md mr-3 ml-3' color="danger" onClick={() => handleSubmit('delete')}><IconContext.Provider value={{ color: 'white', size: '1.7em', className: 'global-class-name' }}>
            <div>
              <GiTrashCan />
            </div>
          </IconContext.Provider></Button>
          <Button className='btn-md ml-3 mr-3' color="primary" onClick={() => handleClick()}><IconContext.Provider value={{ color: 'white', size: '1.7em', className: 'global-class-name' }}>
            <div>
              <GiMusicalNotes />
            </div>
          </IconContext.Provider></Button>
          <Button className='btn-md p-2 ml-1 mr-1 mt-2' color="info" onClick={() => handleSubmit('update')}>
        {updating ? 'Close Form' : 'Edit List'}
      </Button>
        </div>
        {
          updating && <EditListForm
          formTitle='Edit List'
          setLists={setLists}
          user={user}
          list={list}
          image={list.image}
          title={list.title}
          />
        }
      </Card>
    </ListSheet>
  );
}

ListCard.propTypes = {
  setLists: PropTypes.func.isRequired,
  user: PropTypes.any,
  list: PropTypes.object.isRequired,
};

export default ListCard;
