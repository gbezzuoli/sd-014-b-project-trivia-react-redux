import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from '../pages/Login';
import Play from '../pages/Play';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/play" component={ Play } />
      </Switch>
    );
  }
}

export default Content;
