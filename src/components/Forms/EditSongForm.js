import React from 'react';
import { Button } from 'reactstrap';

export default function EditSongForm() {
  return (
    <>
      <div className='song-form'>
        <form
        id='edit-song-form'
        autoComplete='off'
        // onSubmit={}
        >
          <h2>Edit Song</h2>
          <label>Title: </label>
          <input></input>
          <label>Image: </label>
          <input></input>
          <label>Text: </label>
          <input></input>
          <Button color="success" type='submit' className="mt-2 p-2">Submit</Button>
        </form>
      </div>
    </>
  );
}
