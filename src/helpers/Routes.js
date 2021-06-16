import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Lists from '../views/Lists';
import Songs from '../views/Songs';
import SingleList from '../views/SingleList';

export default function Routes({ user }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/lists'
        user={user}
        component={() => (
          <Lists user={user}/>)}
          />
        <Route exact path='/songs'
        user={user}
        component={() => (
          <Songs user={user}/>)}
          />
        <Route exact path='/lists/:firebaseKey' component={SingleList} />

      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any
};
