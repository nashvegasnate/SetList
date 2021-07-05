import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Label,
  Input,
  Form
} from 'reactstrap';
import { createSong, updateListSong, updateSong } from '../../helpers/data/SongsData';

export default function EditSongForm({
  setSongs,
  user,
  lists,
  title,
  image,
  text,
  firebaseKey,
  listId
}) {
  const [song, setSong] = useState({
    title: title || '',
    image: image || '',
    text: text || '',
    firebaseKey: firebaseKey || null,
    uid: user.uid
  });
  const history = useHistory();
  console.warn(lists);

  const handleInputChange = (e) => {
    setSong((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listId) {
      updateListSong(listId, song.uid, song.firebaseKey, song).then(setSongs);
    } else if (song.firebaseKey) {
      updateSong(song.uid, song.firebaseKey, song).then(setSongs);
    } else {
      createSong(song.uid, song).then((songsArray) => setSongs(songsArray));
      history.push('/songs');
    }
  };

  return (
    <>
      <div className='song-form-container'>
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
  user: PropTypes.any,
  setSongs: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  listId: PropTypes.string
};
