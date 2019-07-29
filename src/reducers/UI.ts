import { Action, Reducer } from "redux";

import { GifView } from "types";

// Types
export interface UIState {
  readonly isDrawerOpen: boolean;
  readonly gifView: GifView;
}

export interface UIAction extends Action {
  readonly gifView?: GifView;
}

// State
const initialState: UIState = {
  isDrawerOpen: false,
  gifView: "fresh"
};

// Actions
export enum UIActionTypes {
  SET_DRAWER_OPEN = "SET_DRAWER_OPEN",
  SET_DRAWER_CLOSED = "SET_DRAWER_CLOSED",
  SET_GIF_VIEW = "SET_GIF_VIEW"
}

export const setDrawerOpen = (): UIAction => ({
  type: UIActionTypes.SET_DRAWER_OPEN
});

export const setDrawerClosed = (): UIAction => ({
  type: UIActionTypes.SET_DRAWER_CLOSED
});

export const setGifView = (gifView: GifView): UIAction => ({
  type: UIActionTypes.SET_GIF_VIEW,
  gifView
});

// Reducer
export const uiReducer: Reducer<UIState, UIAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UIActionTypes.SET_DRAWER_OPEN:
      return { ...state, isDrawerOpen: true };
    case UIActionTypes.SET_DRAWER_CLOSED:
      return { ...state, isDrawerOpen: false };
    case UIActionTypes.SET_GIF_VIEW:
      if (!action.gifView) {
        return state;
      }
      return { ...state, gifView: action.gifView };
    default:
      return state;
  }
};
