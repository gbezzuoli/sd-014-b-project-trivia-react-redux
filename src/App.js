import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
