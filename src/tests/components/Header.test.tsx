import React from "react";

import { Header } from "components";
import { TestHelper, TestHelperOptions } from "tests";

const props = {
  username: "",
  getUser: jest.fn(),
  onLogout: jest.fn(),
  onMenuClick: jest.fn(),
  onSearch: jest.fn()
};

describe("Header", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "Header"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(Header, props, options);
      expect(element).toMatchSnapshot();
    });

    it("renders correctly if user is authenticated", () => {
      const { element } = TestHelper.getInstanceObjects(
        Header,
        { ...props, username: "test" },
        options
      );
      expect(element).toMatchSnapshot();
    });
  });

  describe("Lifecycle Methods", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "Header",
        disableLifecycleMethods: false
      };
    });

    it("fetches data on componentDidMount", () => {
      const getUser = jest.fn();
      TestHelper.getInstanceObjects(Header, { ...props, getUser }, options);
      expect(getUser).toHaveBeenCalled();
    });

    it("clears popover if username changes on componentDidUpdate", () => {
      let username = "";
      const { wrapper } = TestHelper.getInstanceObjects(
        Header,
        { ...props, username },
        options
      );

      wrapper.setState({ anchorEl: <button /> });
      wrapper.update();
      expect(wrapper.state().anchorEl).not.toBeNull();

      wrapper.setProps({ username: "test" });
      wrapper.update();
      expect(wrapper.state().anchorEl).toBeNull();
    });
  });

  describe("Class and Prop Methods", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "Header"
      };
    });

    it("calls onMenuClick when Menu button is clicked", () => {
      const onMenuClick = jest.fn();
      const { wrapper } = TestHelper.getInstanceObjects(
        Header,
        { ...props, username: "test", onMenuClick },
        options
      );

      wrapper.find("#header-button-menu").simulate("click");
      expect(onMenuClick).toHaveBeenCalled();
    });

    it("calls onLogout when Log Out button is clicked", () => {
      const onLogout = jest.fn();
      const { wrapper } = TestHelper.getInstanceObjects(
        Header,
        { ...props, username: "test", onLogout },
        options
      );

      wrapper.find("#header-button-logout").simulate("click");
      expect(onLogout).toHaveBeenCalled();
    });

    it("toggles popover when Log In button is clicked", () => {
      const { wrapper } = TestHelper.getInstanceObjects(
        Header,
        { ...props, username: "" },
        options
      );

      expect(wrapper.state().anchorEl).toBeNull();
      wrapper.find("#header-button-login").simulate("click", { currentTarget: <button />});
      expect(wrapper.state().anchorEl).not.toBeNull();
    });
  });
});
