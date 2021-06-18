import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Input
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { createSong, updateSong } from '../../helpers/data/SongsData';

export default function AddSongForm({
  user, formTitle, setSongs, title, image, lists, firebaseKey
}) {
  const [song, setSong] = useState({
    title: title || '',
    image: image || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid,
  });
  console.warn(song);
  const handleInputChange = (e) => {
    setSong((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === 'favorite' ? e.target.checked : e.target.value
    }));
    console.warn(song);
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (song.firebaseKey) {
      updateSong(song, user).then(setSongs);
    } else {
      createSong(song, user).then(setSongs);
      history.push('songs');
    }
  };
  return (
    <div className="song-form-container">
      <Form className="add-song-form" autoComplete="off">
        <h4 className="mt-4 text-center mb-2">{formTitle}</h4>
        <Input
          name="title"
          type="text"
          placeholder="Title"
          value={song.title}
          onChange={handleInputChange}
          className="mt-2"
        ></Input>
        <br></br>
        <Input
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          value={song.image}
          onChange={handleInputChange}
          className="mt-1"
        ></Input>
        <Input>
        <Input
          name="text"
          type="text"
          placeholder="Text Field"
          value={song.text}
          onChange={handleInputChange}
          className="mt-2"
        ></Input>
        </Input>
        <br></br>
        <Input
          type="select"
          name="firebaseKey"
          placeholder="List Name"
          id="exampleSelect"
          onChange={handleInputChange}
        >
          {lists?.map((list) => (
            <option key={list.firebaseKey} value={list.firebaseKey}>
              {list.title}
            </option>
          ))}
        </Input>
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
