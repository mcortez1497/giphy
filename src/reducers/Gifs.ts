import { Action, Dispatch, Reducer } from "redux";

import { AppState, getUserGifs } from "reducers";
import { Gif, GifPagination, GifResponse } from "types";

export interface GifState {
  readonly items: Gif[];
  readonly pagination: GifPagination;
}

// Types
export interface GifAction extends Action {
  readonly items?: Gif[];
  readonly pagination?: GifPagination;
}

// State
const initialState: GifState = {
  items: [],
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0
  }
};

// Actions
export enum GifActionTypes {
  GET_GIFS = "GET_GIFS",
  SET_GIFS = "SET_GIFS",
  SET_PAGINATION = "SET_PAGINATION"
}

export const setGifs = (items: Gif[]): GifAction => ({
  type: GifActionTypes.SET_GIFS,
  items
});

export const setPagination = (pagination: GifPagination): GifAction => ({
  type: GifActionTypes.SET_PAGINATION,
  pagination
});

// Reducer
export const gifReducer: Reducer<GifState, GifAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GifActionTypes.SET_GIFS:
      if (!action.items) {
        return state;
      }
      return { ...state, items: action.items };
    case GifActionTypes.SET_PAGINATION:
      if (!action.pagination) {
        return state;
      }
      return { ...state, pagination: { ...action.pagination } };
    default:
      return state;
  }
};

// Thunks
export const getGifs = (query: string = "") => async (
  dispatch: Dispatch<GifAction>
) => {
  const url = `/api/gifs${query ? `?q=${query}` : ""}`;

  await fetch(url)
    .then(response => response.json())
    .then(json => {
      const items: Gif[] = json.data.map((gif: GifResponse) => ({
        giphy_id: gif.id,
        url: gif.images.original.url,
        title: gif.title
      }));
      dispatch(setGifs(items));
      dispatch(setPagination(json.pagination));
    })
    .catch(error => console.log(error));
};

export const viewUserGifs = () => async (
  dispatch: Dispatch<GifAction>,
  getState: () => AppState
) => {
  getUserGifs()(dispatch)
    .then(() => {
      dispatch(setGifs(getState().user.gifs));
      dispatch(setPagination(initialState.pagination));
    })
    .catch(error => console.log(error));
};
