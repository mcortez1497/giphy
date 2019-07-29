import { Action, Dispatch, Reducer } from "redux";

import { AppState } from "reducers";
import { Category, Gif } from "types";
import { getGifs } from "./Gifs";

export interface UserState {
  readonly username: string;
  readonly gifs: Gif[];
  readonly categories: {
    items: Category[];
  };
}

// Types
export interface UserAction extends Action {
  readonly category?: Category;
  readonly categories?: Category[];
  readonly gif?: Gif;
  readonly gifs?: Gif[];
  readonly id?: string;
  readonly username?: string;
}

// State
const initialState: UserState = {
  username: "",
  gifs: [],
  categories: {
    items: []
  }
};

// Actions
export enum UserActionTypes {
  ADD_USER_CATEGORY = "ADD_USER_CATEGORY",
  ADD_USER_GIF = "ADD_USER_GIF",
  DELETE_USER_GIF = "DELETE_USER_GIF",
  GET_USER_GIFS = "GET_USER_GIFS",
  RESET_USER = "RESET_USER",
  SET_USER_CATEGORIES = "SET_USER_CATEGORIES",
  SET_USER_GIFS = "SET_USER_GIFS",
  SET_USERNAME = "SET_USERNAME",
  UPDATE_USER_GIF = "UPDATE_USER_GIF"
}

const addUserCategory = (category: Category): UserAction => ({
  type: UserActionTypes.ADD_USER_CATEGORY,
  category
});

const addUserGif = (gif: Gif): UserAction => ({
  type: UserActionTypes.ADD_USER_GIF,
  gif
});

const deleteUserGif = (id: string): UserAction => ({
  type: UserActionTypes.DELETE_USER_GIF,
  id
});

const updateUserGif = (gif: Gif): UserAction => ({
  type: UserActionTypes.UPDATE_USER_GIF,
  gif
});

const resetUser = (): UserAction => ({
  type: UserActionTypes.RESET_USER
});

export const setUsername = (username: string): UserAction => ({
  type: UserActionTypes.SET_USERNAME,
  username
});

export const setUserCategories = (categories: Category[]): UserAction => ({
  type: UserActionTypes.SET_USER_CATEGORIES,
  categories
});

export const setUserGifs = (gifs: Gif[]): UserAction => ({
  type: UserActionTypes.SET_USER_GIFS,
  gifs
});

// Reducer
export const userReducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.ADD_USER_CATEGORY:
      if (!action.category) {
        return state;
      }
      return {
        ...state,
        categories: { items: [...state.categories.items, action.category] }
      };
    case UserActionTypes.ADD_USER_GIF:
      if (!action.gif) {
        return state;
      }
      return { ...state, gifs: [...state.gifs, action.gif] };
    case UserActionTypes.DELETE_USER_GIF:
      if (!action.id) {
        return state;
      }
      return {
        ...state,
        gifs: state.gifs.filter(gif => gif._id !== action.id)
      };
    case UserActionTypes.RESET_USER:
      return { ...initialState };
    case UserActionTypes.SET_USERNAME:
      if (!action.username) {
        return state;
      }
      return { ...state, username: action.username };
    case UserActionTypes.SET_USER_CATEGORIES:
      if (!action.categories) {
        return state;
      }
      return { ...state, categories: { items: action.categories } };
    case UserActionTypes.SET_USER_GIFS:
      if (!action.gifs) {
        return state;
      }
      return { ...state, gifs: action.gifs };
    case UserActionTypes.UPDATE_USER_GIF:
      if (!action.gif) {
        return state;
      }
      return {
        ...state,
        gifs: state.gifs.map(gif =>
          action.gif && action.gif._id === gif._id ? action.gif : gif
        )
      };
    default:
      return state;
  }
};

// Thunks

// Authentication
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
    .then(json => {
      dispatch(setUsername(json.username));
      getUserData(dispatch);
    })
    .catch(error => console.log(error));
};

export const logout = () => async (dispatch: Dispatch<UserAction>) => {
  await fetch("/api/logout", {
    method: "DELETE"
  })
    .then(response => {
      dispatch(resetUser());
      getGifs()(dispatch);
    })
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

// User Data
export const getUser = () => async (dispatch: Dispatch<UserAction>) =>
  // TODO: Make this more intuitive
  await fetch("/api/user")
    .then(async response => {
      if (!response.ok) {
        return;
      }
      await response.json().then(json => {
        dispatch(setUsername(json.username));
        getUserData(dispatch);
      });
    })
    .catch(error => console.log(error));

export const getUserGifs = () => async (dispatch: Dispatch<UserAction>) => {
  await fetch("/api/user/gifs")
    .then(response => response.json())
    .then(json => dispatch(setUserGifs(json.gifs)))
    .catch(error => console.log(error));
};

export const getUserCategories = () => async (
  dispatch: Dispatch<UserAction>
) => {
  await fetch("/api/user/categories")
    .then(response => response.json())
    .then(json => dispatch(setUserCategories(json.categories)))
    .catch(error => console.log(error));
};

const getUserData = async (dispatch: Dispatch<UserAction>) =>
  Promise.all([getUserGifs()(dispatch), getUserCategories()(dispatch)]);

// User Gif Data
export const addGif = (gif: Gif) => async (dispatch: Dispatch<UserAction>) => {
  await fetch("/api/user/gifs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      giphy_id: gif.giphy_id,
      title: gif.title,
      url: gif.url
    })
  })
    .then(response => response.json())
    .then(json => dispatch(addUserGif(json.gif)))
    .catch(error => console.log(error));
};

export const deleteGif = (id: string) => async (
  dispatch: Dispatch<UserAction>,
  getState: () => AppState
) => {
  // If the GIF doesn't have an _id, that means we're looking at fresh Gifs.
  // So, we'll need to find the _id in our saved gifs.
  // const id =
  //   gif._id ||
  //   getState().user.gifs.reduce(
  //     (acc: string = "", userGif: Gif) =>
  //       userGif.giphy_id === gif.giphy_id ? userGif._id || "" : "",
  //     ""
  //   );

  await fetch(`/api/user/gifs/${id}`, {
    method: "DELETE"
  })
    .then(response => dispatch(deleteUserGif(id)))
    .catch(error => console.log(error));
};

export const updateGif = (id: string, categoryIds: string[]) => async (
  dispatch: Dispatch<UserAction>,
  getState: () => AppState
) => {
  // If the GIF doesn't have an _id, that means we're looking at fresh Gifs.
  // So, we'll need to find the _id in our saved gifs.
  // const id =
  //   gif._id ||
  //   getState().user.gifs.reduce(
  //     (acc: string = "", userGif: Gif) =>
  //       userGif.giphy_id === gif.giphy_id ? userGif._id || "" : "",
  //     ""
  //   );

  await fetch(`/api/user/gifs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      categoryIds
    })
  })
    .then(response => response.json())
    .then(json => dispatch(updateUserGif(json.gif)))
    .catch(error => console.log(error));
};

// User Category Data
export const addCategory = (name: string) => async (
  dispatch: Dispatch<UserAction>
) =>
  await fetch("/api/user/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name
    })
  })
    .then(response => response.json())
    .then(json => dispatch(addUserCategory(json.category)))
    .catch(error => console.log(error));
