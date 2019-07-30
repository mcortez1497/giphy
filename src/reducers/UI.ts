import { Action, Reducer } from "redux";

// Types
export interface UIState {
  readonly didRegister: boolean;
  readonly isDrawerOpen: boolean;
}

// State
const initialState: UIState = {
  didRegister: false,
  isDrawerOpen: false
};

// Actions
export enum UIActionTypes {
  SET_DRAWER_OPEN = "SET_DRAWER_OPEN",
  SET_DRAWER_CLOSED = "SET_DRAWER_CLOSED",
  SET_REGISTRATION_COMPLETE = "SET_REGISTRATION_COMPLETE",
  RESET_REGISTRATION = "RESET_REGISTRATION"
}

export const setDrawerOpen = (): Action => ({
  type: UIActionTypes.SET_DRAWER_OPEN
});

export const setDrawerClosed = (): Action => ({
  type: UIActionTypes.SET_DRAWER_CLOSED
});

export const setRegistrationComplete = (): Action => ({
  type: UIActionTypes.SET_REGISTRATION_COMPLETE
});

export const resetRegistration = (): Action => ({
  type: UIActionTypes.RESET_REGISTRATION
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
    case UIActionTypes.SET_REGISTRATION_COMPLETE:
      return { ...state, didRegister: true };
    case UIActionTypes.RESET_REGISTRATION:
      return { ...state, didRegister: false };
    default:
      return state;
  }
};
