import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  FormGroup,
  Label
} from 'reactstrap';
import { createSong } from '../../helpers/data/SongsData';

export default function AddSongForm({
  user,
  formTitle,
  setSongs,
  title,
  image,
  lists,
  firebaseKey
}) {
  const [song, setSong] = useState({
    title: title || '',
    image: image || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid,
  });
  console.warn(song);

  // const history = useHistory();

  const handleInputChange = (e) => {
    setSong((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    console.warn(song);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSong(song, user.uid).then(setSongs);
  };

  return (
    <div className="song-form-container">
      <Form id="add-song-form" autoComplete="off" onSubmit={handleSubmit}>
        <h4 className="mt-4 text-center mb-2">{formTitle}</h4>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            name="title"
            id="title"
            type="text"
            placeholder="Title"
            value={song.title}
            onChange={handleInputChange}
            className="mt-2"
          />
        </FormGroup>
        <br></br>
        <FormGroup>
          <Input
            name="imageUrl"
            id="image"
            type="url"
            placeholder="Image URL"
            value={song.image}
            onChange={handleInputChange}
            className="mt-1"
          />
        </FormGroup>
        <br></br>
        <FormGroup>
          <Input
            name="text"
            id="text"
            type="text"
            placeholder="Text Field"
            value={song.text}
            onChange={handleInputChange}
            className="mt-2"
          />
        </FormGroup>
        <br></br>
        <FormGroup>
          <Input
            type="select"
            name="firebaseKey"
            placeholder="Assign to List"
            id="exampleSelect"
            onChange={handleInputChange}
          />
        </FormGroup>
          {lists?.map((list) => (
            <option key={list.firebaseKey} value={list.firebaseKey}>
              {list.title}
            </option>
          ))}
        <br></br>
        <Button
          color="danger"
          type="submit"
          onClick={handleSubmit}
          className="mt-2 ml-1"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

AddSongForm.propTypes = {
  user: PropTypes.any,
  formTitle: PropTypes.string,
  setSongs: PropTypes.func,
  title: PropTypes.string,
  image: PropTypes.string,
  firebaseKey: PropTypes.string,
  lists: PropTypes.array,
};
