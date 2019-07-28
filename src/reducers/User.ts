import { Action, Dispatch, Reducer } from "redux";

export interface UserState {
  readonly username: string;
}

// Types
export interface UserAction extends Action {
  readonly username?: string;
}

// State
const initialState: UserState = {
  username: ""
};

// Actions
export enum UserActionTypes {
  RESET_USER = "RESET_USER",
  SET_USERNAME = "SET_USERNAME"
}

const resetUser = (): UserAction => ({
  type: UserActionTypes.RESET_USER
});

export const setUsername = (username: string): UserAction => ({
  type: UserActionTypes.SET_USERNAME,
  username
});

// Reducer
export const userReducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.RESET_USER:
      return { ...initialState };
    case UserActionTypes.SET_USERNAME:
      if (!action.username) {
        return state;
      }
      return { ...state, username: action.username };
    default:
      return state;
  }
};

// Thunks
export const login = (username: string, password: string) => async (
  dispatch: Dispatch<UserAction>
) => {
  await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => response.json())
    .then(json => dispatch(setUsername(json.username)))
    .catch(error => console.log(error));
};

export const logout = () => async (dispatch: Dispatch<UserAction>) => {
  await fetch("/api/logout", {
    method: "DELETE"
  })
    .then(response => dispatch(resetUser()))
    .catch(error => console.log(error));
};

export const register = (username: string, password: string) => async (
  dispatch: Dispatch<UserAction>
) => {
  await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

export const profile = () => async (dispatch: Dispatch<UserAction>) => {
  // TODO: Make this more intuitive
  await fetch("/api/user")
    .then(async response => {
      if (!response.ok) {
        return;
      }
      await response.json().then(json => dispatch(setUsername(json.username)));
    })
    .catch(error => console.log(error));
};

export const createCategory = (name: string) => async (
  dispatch: Dispatch<UserAction>
) => {
  await fetch("/api/user/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name
    })
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
