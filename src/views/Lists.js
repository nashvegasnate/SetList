import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

function Lists() {
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };

  return (
   <>
    <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color='danger' onClick={handleClick}>Add A List</Button>
        : <div>
        <Button className="m-2 btn-lg" color='info' onClick={handleClick}>Close</Button>
      </div>
      }
    </section>
      <h1>This is the Lists page</h1>
    </>
  );
}

// Lists.propTypes = {
//   user: PropTypes.any
// };

export default Lists;
