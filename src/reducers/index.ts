import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import { gifReducer, GifState } from './Gifs';
export * from './Gifs';

const middlewares = [reduxThunk];

export const store = createStore(
  combineReducers({
    gifs: gifReducer
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export interface AppState {
  gifs: GifState;
}
