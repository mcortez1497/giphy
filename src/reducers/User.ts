import { Action, Dispatch, Reducer } from "redux";

import {
  AppState,
  getGifs,
  resetRegistration,
  setDrawerOpen,
  setRegistrationComplete
} from "reducers";
import { Api } from "services";
import { Category, Gif } from "types";

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
  DELETE_USER_CATEGORY = "DELETE_USER_CATEGORY",
  DELETE_USER_GIF = "DELETE_USER_GIF",
  GET_USER = "GET_USER",
  GET_USER_CATEGORIES = "GET_USER_CATEGORIES",
  GET_USER_GIFS = "GET_USER_GIFS",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
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

const deleteUserCategory = (id: string): UserAction => ({
  type: UserActionTypes.DELETE_USER_CATEGORY,
  id
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
    case UserActionTypes.DELETE_USER_CATEGORY:
      if (!action.id) {
        return state;
      }
      return {
        ...state,
        categories: {
          items: state.categories.items.filter(
            category => category._id !== action.id
          )
        }
      };
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
) =>
  Api.fetch("/api/login", UserActionTypes.LOGIN, dispatch, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username,
      password
    })
  }).then(json => {
    if (json.username) {
      dispatch(setUsername(json.username));
      dispatch(setDrawerOpen());
      dispatch(resetRegistration());
      getUserData(dispatch);
    }
  });

export const logout = () => async (dispatch: Dispatch<UserAction>) =>
  Api.fetch("/api/logout", UserActionTypes.LOGOUT, dispatch, {
    method: "DELETE"
  }).then(json => {
    if (json.success) {
      dispatch(resetUser());
      getGifs()(dispatch);
    }
  });

export const register = (username: string, password: string) => async (
  dispatch: Dispatch<UserAction>
) =>
  Api.fetch("/api/register", UserActionTypes.REGISTER, dispatch, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username,
      password
    })
  }).then(json => {
    if (json.success) {
      dispatch(setRegistrationComplete());
    }
  });

// User Data
export const getUser = () => async (
  dispatch: Dispatch<UserAction>,
  getState: () => AppState
) =>
  Api.fetch("/api/user", UserActionTypes.GET_USER, dispatch).then(json => {
    if (json.username && getState().user.username === "") {
      dispatch(setUsername(json.username));
      getUserData(dispatch);
    }
  });

export const getUserGifs = () => async (dispatch: Dispatch<UserAction>) =>
  Api.fetch("/api/user/gifs", UserActionTypes.GET_USER_GIFS, dispatch).then(
    json => {
      if (json.gifs) {
        dispatch(setUserGifs(json.gifs));
      }
    }
  );

export const getUserCategories = () => async (
  dispatch: Dispatch<UserAction>
) => {
  Api.fetch(
    "/api/user/categories",
    UserActionTypes.GET_USER_CATEGORIES,
    dispatch
  ).then(json => {
    if (json.categories) {
      dispatch(setUserCategories(json.categories));
    }
  });
};

// Return all of this in a single API call
const getUserData = async (dispatch: Dispatch<UserAction>) =>
  Promise.all([getUserGifs()(dispatch), getUserCategories()(dispatch)]);

// User Gif Data
export const addGif = (gif: Gif) => async (dispatch: Dispatch<UserAction>) =>
  Api.fetch("/api/user/gifs", UserActionTypes.ADD_USER_GIF, dispatch, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      giphy_id: gif.giphy_id,
      fixed_url: gif.fixed_url,
      original_url: gif.original_url,
      title: gif.title,
      height: gif.height
    })
  }).then(json => {
    if (json.gif) {
      dispatch(addUserGif(json.gif));
    }
  });

export const deleteGif = (id: string) => async (
  dispatch: Dispatch<UserAction>
) =>
  Api.fetch(`/api/user/gifs/${id}`, UserActionTypes.DELETE_USER_GIF, dispatch, {
    method: "DELETE"
  }).then(json => {
    if (json.success) {
      dispatch(deleteUserGif(id));
    }
  });

export const updateGif = (id: string, categoryIds: string[]) => async (
  dispatch: Dispatch<UserAction>
) => {
  Api.fetch(`/api/user/gifs/${id}`, UserActionTypes.UPDATE_USER_GIF, dispatch, {
    method: "PATCH",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      categoryIds
    })
  }).then(json => {
    if (json.gif) {
      dispatch(updateUserGif(json.gif));
    }
  });
};

// User Category Data
export const addCategory = (name: string) => async (
  dispatch: Dispatch<UserAction>
) =>
  Api.fetch(
    "/api/user/categories",
    UserActionTypes.ADD_USER_CATEGORY,
    dispatch,
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        name
      })
    }
  ).then(json => {
    if (json.category) {
      dispatch(addUserCategory(json.category));
    }
  });

export const deleteCategory = (id: string) => async (
  dispatch: Dispatch<UserAction>
) =>
  Api.fetch(
    `/api/user/categories/${id}`,
    UserActionTypes.DELETE_USER_CATEGORY,
    dispatch,
    {
      method: "DELETE"
    }
  ).then(json => {
    if (json.success) {
      dispatch(deleteUserCategory(id));
    }
  });
