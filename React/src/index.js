import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore,applyMiddleware } from "redux";
import {Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';
import store from "./store";


ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>
    , document.getElementById('root'));
