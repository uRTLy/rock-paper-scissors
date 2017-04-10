import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


import { reducer as gameStateReducer } from './models/gameState.js';

const middlewares = applyMiddleware(
  thunkMiddleware,
  createLogger()
);

const store = createStore(
  combineReducers({
    gameStateReducer
  }),
  middlewares
);
 
export { actions as gameStateActions } from './models/gameState.js';
export { store };
