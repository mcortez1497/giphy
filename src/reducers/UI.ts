import { Action, Reducer } from "redux";

export interface UIState {
  readonly isDrawerOpen: boolean;
}

// State
const initialState: UIState = {
  isDrawerOpen: false
};

// Actions
export enum UIActionTypes {
  SET_DRAWER_OPEN = "SET_DRAWER_OPEN",
  SET_DRAWER_CLOSED = "SET_DRAWER_CLOSED"
}

export const setDrawerOpen = (): Action => ({
  type: UIActionTypes.SET_DRAWER_OPEN
});

export const setDrawerClosed = (): Action => ({
  type: UIActionTypes.SET_DRAWER_CLOSED
});

// Reducer
export const uiReducer: Reducer<UIState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UIActionTypes.SET_DRAWER_OPEN:
      return { ...state, isDrawerOpen: true };
    case UIActionTypes.SET_DRAWER_CLOSED:
      return { ...state, isDrawerOpen: false };
    default:
      return state;
  }
};