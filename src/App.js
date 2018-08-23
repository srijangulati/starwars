import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Router from './Router';
import logo from './logo.svg';
import './App.css';

let store = createStore(reducer,applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

export default App;
