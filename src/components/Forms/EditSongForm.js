import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Label,
  Input,
  Form
} from 'reactstrap';
import { createSong, updateSong } from '../../helpers/data/SongsData';

export default function EditSongForm({
  setSongs,
  user,
  lists,
  title,
  image,
  text,
  firebaseKey
}) {
  const [song, setSong] = useState({
    title: title || '',
    image: image || '',
    text: text || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid
  });
  const history = useHistory();

  const handleInputChange = (e) => {
    setSong((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (song.firebaseKey) {
      updateSong(song.uid, song.firebaseKey, song).then(setSongs);
    } else {
      createSong(song.uid, song).then((songsArray) => setSongs(songsArray));
      history.push('/songs');
    }
  };

  return (
    <>
      <div className='song-form'>
        <Form id='edit-song-form'
          autoComplete='off'
          onSubmit={handleSubmit}
          >
          <h2>Edit Song</h2>
          <Label>Title: </Label>
          <Input
            name='title'
            type='text'
            value={song.title}
            onChange={handleInputChange}
            >
          </Input>
          <Label>Image: </Label>
          <Input
            name='image'
            type='text'
            value={song.image}
            onChange={handleInputChange}
            >
          </Input>
          <Label>Text:</Label>
          <Input
            name='text'
            type='text'
            value={song.text}
            onChange={handleInputChange}
            >
          </Input>
          <Label>Assign To List</Label>
          <Input
          type="select"
          name="listId"
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
          <Button color="success" type='submit' className="mt-2 p-2">Submit</Button>
        </Form>
      </div>
    </>
  );
}

EditSongForm.propTypes = {
  setSongs: PropTypes.func.isRequired,
  user: PropTypes.any,
  lists: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired
};
