import { Action, Dispatch, Reducer } from "redux";

import { AppState } from "reducers";
import { Api } from "services";
import { Gif, GifPagination, GifResponse } from "types";

const API_LIMIT = 24;

export interface GifState {
  readonly items: Gif[];
  readonly pagination: GifPagination;
  readonly query: string;
}

// Types
export interface GifAction extends Action {
  readonly items?: Gif[];
  readonly pagination?: GifPagination;
  readonly query?: string;
}

// State
const initialState: GifState = {
  items: [],
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0
  },
  query: ""
};

// Actions
export enum GifActionTypes {
  ADD_GIFS = "ADD_GIFS",
  GET_GIFS = "GET_GIFS",
  GET_MORE_GIFS = "GET_MORE_GIFS",
  SET_GIFS = "SET_GIFS",
  SET_PAGINATION = "SET_PAGINATION"
}

export const addGifs = (items: Gif[]): GifAction => ({
  type: GifActionTypes.ADD_GIFS,
  items
});

export const setGifs = (items: Gif[], query: string): GifAction => ({
  type: GifActionTypes.SET_GIFS,
  items,
  query
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
    case GifActionTypes.ADD_GIFS:
      if (!action.items) {
        return state;
      }
      return { ...state, items: [...state.items, ...action.items] };
    case GifActionTypes.SET_GIFS:
      if (!action.items || action.query === undefined) {
        return state;
      }
      return { ...state, items: action.items, query: action.query };
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
  const url = `/api/gifs?limit=${API_LIMIT}${query ? `&q=${query}` : ""}`;

  Api.fetch(url, GifActionTypes.GET_GIFS, dispatch)
    .then(json => {
      if (json.data) {
        const items: Gif[] = json.data.map((gif: GifResponse) => ({
          giphy_id: gif.id,
          url: gif.images.original.url,
          title: gif.title
        }));
        dispatch(setGifs(items, query));
        dispatch(setPagination(json.pagination));
      }
    })
    .catch(error => console.log(error));
};

export const getMoreGifs = () => async (
  dispatch: Dispatch<GifAction>,
  getState: () => AppState
) => {
  const query = getState().gifs.query;
  const pagination = getState().gifs.pagination;
  const offset = pagination.offset + pagination.count;

  const url = `/api/gifs?limit=${API_LIMIT}&offset=${offset}${
    query ? `&q=${query}` : ""
  }`;

  Api.fetch(url, GifActionTypes.GET_MORE_GIFS, dispatch)
    .then(json => {
      if (json.data) {
        const items: Gif[] = json.data.map((gif: GifResponse) => ({
          giphy_id: gif.id,
          url: gif.images.original.url,
          title: gif.title
        }));
        dispatch(addGifs(items));
        dispatch(setPagination(json.pagination));
      }
    })
    .catch(error => console.log(error));
};
