import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import { apiReducer, ApiState } from "./Api";
import { gifReducer, GifState } from "./Gifs";
import { userReducer, UserState } from "./User";
import { uiReducer, UIState } from "./UI";

export * from "./Api";
export * from "./Gifs";
export * from "./User";
export * from "./UI";

const middlewares = [reduxThunk];

export const store = createStore(
  combineReducers({
    api: apiReducer,
    gifs: gifReducer,
    user: userReducer,
    ui: uiReducer
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export interface AppState {
  api: ApiState;
  gifs: GifState;
  user: UserState;
  ui: UIState;
}
