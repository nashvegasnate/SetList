import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Lists from '../views/Lists';
import Songs from '../views/Songs';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/lists' component={Lists} />
        <Route exact path='/songs' component={Songs} />
      </Switch>
    </div>
  );
}
