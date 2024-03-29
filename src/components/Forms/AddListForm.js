import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  Form,
  Input,
  Label
} from 'reactstrap';
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
      <Form id='add-list-form'
        autoComplete='off'
      >
        <h1>{formTitle}</h1>
        <FormGroup>
        <Label>List Title: </Label>
        <Input
          name='title'
          type='text'
          placeholder='Title'
          value={list.title}
          onChange={handleInputChange}
        />
          </FormGroup>
        <br></br>
        <Label>Image Url: </Label>
        <FormGroup>
          <Input
          name='image'
          type='url'
          placeholder='Image URL'
          value={list.imageUrl}
          onChange={handleInputChange}
        />
        </FormGroup>
        <Button color="danger" type='submit' onClick={handleSubmit} className='mt-4'>Submit</Button>
      </Form>
    </div>
  );
}

AddListForm.propTypes = {
  user: PropTypes.any,
  formTitle: PropTypes.string.isRequired,
  setLists: PropTypes.func.isRequired,
};
