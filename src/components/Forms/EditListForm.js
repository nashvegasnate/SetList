import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Label,
  Input,
  Form
} from 'reactstrap';
import { createList, updateList } from '../../helpers/data/ListsData';

export default function EditListForm({ user, setLists }) {
  const [list, setList] = useState({
    title: '',
    image: '',
    uid: user.uid
  });
  // const history = useHistory();

  const handleInputChange = (e) => {
    setList((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (list.firebaseKey) {
      updateList(list.uid, list.firebaseKey, list).then(setLists);
    } else {
      createList(list.uid, list).then((listsArray) => setLists(listsArray));
      // history.pushState('/lists');
    }
  };
  // createList(list, user.uid).then(setLists);

  return (
    <>
    <div className='list-form-container'>
      <Form id='edit-list-form'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Label>Title:</Label>
        <Input
          name='title'
          type='text'
          value={list.title}
          onChange={handleInputChange}
        >
        </Input>
        <Label>Image Url:</Label>
        <Input
          name='image'
          type='url'
          value={list.imageUrl}
          onChange={handleInputChange}
        >
        </Input>
        <Button color="danger" type='submit' className='mt-4'>Submit</Button>
      </Form>
    </div>
    </>
  );
}

EditListForm.propTypes = {
  user: PropTypes.any,
  setLists: PropTypes.func.isRequired,
};
