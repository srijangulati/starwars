import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';

const Routes = ()=>(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/search" exact component={Search}/>
    </Switch>
  </BrowserRouter>
);
export default Routes;
