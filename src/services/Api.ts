import { Dispatch } from "redux";

import { apiRequestStart, apiRequestSuccess, apiRequestError } from "reducers";
import { isObject } from "util";

interface FetchOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: Headers;
  body?: string;
}

// Simple wrapper for the fetch API
// Dispatches actions so our app can know the status of
// each API request, as well as guarantee a formatted error object
class Api {
  private defaultOptions: FetchOptions = {
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };

  public fetch(
    url: string,
    actionType: string,
    dispatch: Dispatch,
    options?: FetchOptions
  ): Promise<any> {
    const fetchOptions: FetchOptions = { ...this.defaultOptions, ...options };

    dispatch(apiRequestStart(actionType));

    return fetch(url, fetchOptions)
      .then(async response => {
        if (response.ok) {
          dispatch(apiRequestSuccess(actionType));
          return response.json();
        } else {
          const error = await response.json();
          dispatch(apiRequestError(actionType, this.buildErrorMessage(error)));
          return error;
        }
      })
      .catch(error => {
        dispatch(apiRequestError(actionType, this.buildErrorMessage(error)));
        return error;
      });
  }

  private buildErrorMessage = (error: any) =>
    isObject(error) && error.message
      ? error.message
      : "An unexpected error occurred.";
}

const ApiSingleton = new Api();
export { ApiSingleton as Api };
