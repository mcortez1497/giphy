import {
  apiRequestClear,
  apiRequestError,
  apiRequestStart,
  apiRequestSuccess,
  apiReducer
} from "reducers";

const initialState = {};

describe("API State", () => {
  describe("Actions", () => {
    it("returns apiRequestClear action", () => {
      expect(apiRequestClear("test")).toMatchSnapshot();
    });

    it("returns apiRequestError action", () => {
      expect(apiRequestError("test", "error")).toMatchSnapshot();
    });

    it("returns apiRequestStart action", () => {
      expect(apiRequestStart("test")).toMatchSnapshot();
    });

    it("returns apiRequestSuccess action", () => {
      expect(apiRequestSuccess("test")).toMatchSnapshot();
    });
  });

  describe("Reducer", () => {
    it("resets API key/value", () => {
      const action = {
        type: "API_REQUEST_CLEAR",
        request: "test"
      };
      expect(apiReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets API key/value as errored", () => {
      const action = {
        type: "API_REQUEST_ERROR",
        request: "test",
        message: "error"
      };
      expect(apiReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets API key/value as loading", () => {
      const action = {
        type: "API_REQUEST_START",
        request: "test"
      };
      expect(apiReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets API key/value as success", () => {
      const action = {
        type: "API_REQUEST_SUCCESS",
        request: "test"
      };
      expect(apiReducer(initialState, action)).toMatchSnapshot();
    });
  });
});
