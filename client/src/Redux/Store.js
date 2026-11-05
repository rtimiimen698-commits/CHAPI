import { createStore, applyMiddleware, compose } from 'redux';
import Reducer from './Reducer';
import {thunk} from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducer,composeEnhancers(
    applyMiddleware(thunk)
  ));

export default store