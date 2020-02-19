<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import { createLogger } from 'redux-logger'
import ReduxThunk from 'redux-thunk'
=======
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import "dotenv/config";
>>>>>>> dev-front

const logger = createLogger()
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
