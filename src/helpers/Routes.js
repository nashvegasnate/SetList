import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Lists from '../views/Lists';
import Songs from '../views/Songs';
import SingleList from '../views/SingleList';

function Routes({ user, lists, setLists }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/lists'
        user={user}
        component={() => (
          <Lists user={user} lists={lists} setLists={setLists}/>)}
          />
        <Route exact path='/songs'
        user={user}
        component={() => (
          <Songs user={user} lists={lists} setLists={setLists}/>)}
          />
        <Route
        exact path='/listSongs/:listId'
        user={user}
        component={() => (
          <SingleList user={user} lists={lists} setLists={setLists}/>)}
          />

      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  lists: PropTypes.array,
  setLists: PropTypes.func
};

export default Routes;
