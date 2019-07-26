import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import { gifReducer, GifState } from './Gifs';
import { userReducer, UserState } from "./User";

export * from './Gifs';
export * from './User';

const middlewares = [reduxThunk];

export const store = createStore(
  combineReducers({
    gifs: gifReducer,
    user: userReducer
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export interface AppState {
  gifs: GifState;
  user: UserState;
}
