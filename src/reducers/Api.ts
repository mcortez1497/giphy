import { Action, Reducer } from "redux";

import { ApiRequest } from "types";

// Types
export interface ApiState {
  readonly [request: string]: ApiRequest;
}

export interface ApiAction extends Action {
  readonly request: string;
  readonly message?: string;
}

export const defaultApiRequest = {
  isError: false,
  isLoading: false,
  isSuccess: false
} as ApiRequest;

// Actions
export enum ApiActionTypes {
  API_REQUEST_CLEAR = "API_REQUEST_CLEAR",
  API_REQUEST_ERROR = "API_REQUEST_ERROR",
  API_REQUEST_START = "API_REQUEST_START",
  API_REQUEST_SUCCESS = "API_REQUEST_SUCCESS"
}

export const apiRequestClear = (request: string): ApiAction => ({
  request,
  type: ApiActionTypes.API_REQUEST_CLEAR
});

export const apiRequestError = (
  request: string,
  message: string
): ApiAction => ({
  type: ApiActionTypes.API_REQUEST_ERROR,
  message,
  request
});

export const apiRequestStart = (request: string): ApiAction => ({
  type: ApiActionTypes.API_REQUEST_START,
  request
});

export const apiRequestSuccess = (request: string): ApiAction => ({
  type: ApiActionTypes.API_REQUEST_SUCCESS,
  request
});

// Reducer
export const apiReducer: Reducer<ApiState, ApiAction> = (
  state = {},
  action
): ApiState => {
  switch (action.type) {
    case ApiActionTypes.API_REQUEST_CLEAR:
      return {
        ...state,
        [action.request]: {
          isError: false,
          isLoading: false,
          isSuccess: false
        }
      };
    case ApiActionTypes.API_REQUEST_ERROR:
      return {
        ...state,
        [action.request]: {
          message: action.message,
          isError: true,
          isLoading: false,
          isSuccess: false
        }
      };
    case ApiActionTypes.API_REQUEST_START:
      return {
        ...state,
        [action.request]: {
          isError: false,
          isLoading: true,
          isSuccess: false
        }
      };
    case ApiActionTypes.API_REQUEST_SUCCESS:
      return {
        ...state,
        [action.request]: {
          isError: false,
          isLoading: false,
          isSuccess: true
        }
      };
    default:
      return state;
  }
};
