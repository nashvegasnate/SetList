import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ListCard from '../components/Cards/ListCard';
import AddListForm from '../components/Forms/AddListForm';
// import { getSongs } from '../helpers/data/SongsData';

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 3%;
`;
function Lists({ user, lists, setLists }) {
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };
  console.warn(lists);
  // const [songs, setSongs] = useState([]);

  // useEffect(() => {
  //   getSongs().then(setSongs);
  // }, []);

  return (
   <div className="lists-page">
    <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color='primary' onClick={handleClick}>Add A List</Button>
        : <div>
        <Button className="m-2 btn-lg" color='info' onClick={handleClick}>Close</Button>
          <AddListForm className="justify-content-center mt-3" setLists={setLists} user={user} lists={lists} formTitle={'Add New List'}/>
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
  </div>
  );
}

Lists.propTypes = {
  user: PropTypes.any,
  lists: PropTypes.array.isRequired,
  setLists: PropTypes.func.isRequired
};

export default Lists;
