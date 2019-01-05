import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import factory from './factory/reducer';

export const rootReducer = combineReducers({
  factory,
});

const loggerMiddleware = createLogger();

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
