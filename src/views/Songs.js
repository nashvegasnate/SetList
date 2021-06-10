import React, { useState } from 'react';
import { Button } from 'reactstrap';

export default function Songs() {
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };
  return (
    <>
    <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color='danger' onClick={handleClick}>Add Song</Button>
        : <div>
        <Button className="m-2 btn-lg" color='info' onClick={handleClick}>Close</Button>
        </div>
      }
    </section>
      <h1>This is the Songs page</h1>
    </>
  );
}
