import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ListCard from '../components/Cards/ListCard';
import AddListForm from '../components/Forms/AddListForm';

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;
export default function Lists({
  setLists, lists, user
}) {
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };
  // const [lists, setLists] = useState([]);
  // const [songs, setSongs] = useState([]);

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
        firebaseKey={listInfo.firebaseKey}
        image={listInfo.image}
        title={listInfo.title}
        user={user}
        setLists={setLists}
        // setSongs={setSongs}
        uid={listInfo.uid}
        />
      ))}
    </ListContainer>
      {/* <h1>This is the Lists page</h1> */}
  </>
  );
}

Lists.propTypes = {
  user: PropTypes.any,
  lists: PropTypes.array,
  setLists: PropTypes.func,
  // setSongs: PropTypes.func,
};
