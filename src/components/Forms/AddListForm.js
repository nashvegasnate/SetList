import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { createList } from '../../helpers/data/ListsData';

export default function AddListForm({ user, formTitle, setLists }) {
  const [list, setList] = useState({
    title: '',
    image: '',
    uid: user.uid
  });

  //   // WHEN USING INPUTS, NEED FUNCTION THAT TRACKS CHANGES A USER MAKES:
  const handleInputChange = (e) => {
    setList((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, user.uid).then(setLists);
  };

  return (
    <div className='list-form-container'>
      <form
        className='add-list-form'
        autoComplete='off'
      >
        <h1>{formTitle}</h1>
        <label>Title:</label>
        <input
          name='title'
          type='text'
          placeholder='Title'
          value={list.title}
          onChange={handleInputChange}
        >
        </input>
        <label>Image Url:</label>
        <input
          name='image'
          type='url'
          placeholder='Image URL'
          value={list.imageUrl}
          onChange={handleInputChange}
        >
        </input>
        <Button color="danger" type='submit' onClick={handleSubmit} className='mt-4'>Submit</Button>
      </form>
    </div>
  );
}

AddListForm.propTypes = {
  user: PropTypes.any,
  formTitle: PropTypes.string,
  setLists: PropTypes.func,
};
