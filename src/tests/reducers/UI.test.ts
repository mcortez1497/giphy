import {
  resetRegistration,
  setDrawerOpen,
  setDrawerClosed,
  setRegistrationComplete,
  uiReducer
} from "reducers";

const initialState = {
  didRegister: false,
  isDrawerOpen: false
};

describe("UI State", () => {
  describe("Actions", () => {
    it("returns resetRegistration action", () => {
      expect(resetRegistration()).toMatchSnapshot();
    });

    it("returns setDrawerOpen action", () => {
      expect(setDrawerOpen()).toMatchSnapshot();
    });

    it("returns setDrawerClosed action", () => {
      expect(setDrawerClosed()).toMatchSnapshot();
    });

    it("returns setRegistrationComplete action", () => {
      expect(setRegistrationComplete()).toMatchSnapshot();
    });
  });

  describe("Reducer", () => {
    it("resets registration", () => {
      const action = {
        type: "RESET_REGISTRATION"
      };
      expect(uiReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets drawer open", () => {
      const action = {
        type: "SET_DRAWER_OPEN"
      };
      expect(uiReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets drawer closed", () => {
      const action = {
        type: "SET_DRAWER_CLOSED"
      };
      expect(uiReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets registration complete", () => {
      const action = {
        type: "SET_REGISTRATION_COMPLETE"
      };
      expect(uiReducer(initialState, action)).toMatchSnapshot();
    });
  });
});
