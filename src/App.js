import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import store from './redux/store';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
