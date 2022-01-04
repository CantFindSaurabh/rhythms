import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import userReducer from './store/reducers/user';
import playerReducer from './store/reducers/player';

import * as actionTypes from './store/actions/actionTypes';

const appReducer = combineReducers({
  user: userReducer,
  player: playerReducer
})

// updating the state to undefined would reset the whole redux state to initial state 
const rootReducer = (state, action) => {

  if (action.type === actionTypes.LOGOUT_USER) {
    localStorage.removeItem("jwtToken");
    state = undefined;
  }

  return appReducer(state, action);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
