import React from 'react';

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
          <button type='submit'></button>
        </form>
      </div>
    </>
  );
}
