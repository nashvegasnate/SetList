import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ListCard from '../components/Cards/ListCard';
import AddListForm from '../components/Forms/AddListForm';
import { getLists } from '../helpers/data/ListsData';
// import { getSongs } from '../helpers/data/SongsData';

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;
function Lists({ user }) {
  const [lists, setLists] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };
  // const [songs, setSongs] = useState([]);

  useEffect(() => {
    getLists(user.uid).then(setLists);
  }, []);

  // useEffect(() => {
  //   getSongs().then(setSongs);
  // }, []);

  return (
   <>
    <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color='danger' onClick={handleClick}>Add A List</Button>
        : <div>
        <Button className="m-2 btn-lg" color='info' onClick={handleClick}>Close</Button>
          <AddListForm className="justify-content-center mt-3" setLists={setLists} user={user} lists={lists}/>
      </div>
      }
    </section>
    {lists?.length === 0
      && <h3 className="text-center mt-2">Nothing to See Here</h3>
    }
    <ListContainer className="card-container" id="list-cards">
      {lists?.map((listInfo) => (
        <ListCard
        key={listInfo.firebaseKey}
        list={listInfo}
        user={user}
        setLists={setLists}
        />
      ))}
    </ListContainer>
  </>
  );
}

Lists.propTypes = {
  user: PropTypes.any,
};

export default Lists;
