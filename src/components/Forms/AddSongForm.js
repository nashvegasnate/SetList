import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  FormGroup,
  Label
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { createSong, updateSong } from '../../helpers/data/SongsData';

export default function AddSongForm({
  user,
  formTitle,
  setSongs,
  title,
  image,
  lists,
  firebaseKey,
  text
}) {
  const [song, setSong] = useState({
    title: title || '',
    image: image || '',
    text: text || '',
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
    // createSong(song, user.uid).then(setSongs);

  return (
    <div className="song-form-container">
      <Form id="add-song-form" autoComplete="off"
      onSubmit={handleSubmit}
      >
        <h4 className="mt-4 text-center mb-2">{formTitle}</h4>
        <FormGroup>
          <Label>SONG TITLE</Label>
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
        <Label>CHART LINK</Label>
        <FormGroup>
          <Input
            name="image"
            id="image"
            type="text"
            placeholder="Image URL"
            value={song.imageUrl}
            onChange={handleInputChange}
            className="mt-1"
          />
        </FormGroup>
        <br></br>
        <Label>SONG NOTES</Label>
        <FormGroup>
          <Input
            name="text"
            id="text"
            type="text"
            placeholder="Add Song Notes"
            value={song.text}
            onChange={handleInputChange}
            className="mt-2"
          />
        </FormGroup>
        <br></br>
        <Label>ASSIGN SONG TO LIST</Label>
          <Input
            type="select"
            name="listId"
            placeholder="Assign to List"
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
  formTitle: PropTypes.string.isRequired,
  setSongs: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
};
