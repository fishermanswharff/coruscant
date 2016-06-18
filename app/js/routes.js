import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import TempConverterApp from './components/tempConverterApp';
import Dashboard from './components/dashboard'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={TempConverterApp}>
      <IndexRoute component={Dashboard} />
    </Route>
  </Router>
)

export default routes;
