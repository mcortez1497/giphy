import React from "react";

import { Drawer } from "components";
import { TestHelper, TestHelperOptions } from "tests";

const props = {
  categories: [{ _id: "123", name: "test-category" }],
  isOpen: true,
  username: "test",
  addCategory: jest.fn(),
  closeDrawer: jest.fn(),
  deleteCategory: jest.fn()
};

describe("Drawer", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "DrawerWithStyles"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(Drawer, props, options);
      expect(element).toMatchSnapshot();
    });

    it("renders drawer in edit mode", () => {
      const { wrapper } = TestHelper.getInstanceObjects(Drawer, props, options);

      wrapper.setState({ isEditing: true });
      wrapper.update();
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it("renders closed isOpen is false", () => {
      const { element } = TestHelper.getInstanceObjects(
        Drawer,
        { ...props, isOpen: false },
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders category message if categories are empty", () => {
      const { element } = TestHelper.getInstanceObjects(
        Drawer,
        { ...props, categories: [] },
        options
      );
      expect(element).toMatchSnapshot();
    });
  });

  describe("Class and Prop Methods", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "DrawerWithStyles"
      };
    });

    it("toggles popover when Settings button is clicked", () => {
      const { wrapper } = TestHelper.getInstanceObjects(Drawer, props, options);

      expect(wrapper.state().anchorEl).toBeNull();
      wrapper
        .find("#drawer-button-settings")
        .simulate("click", { currentTarget: <button /> });
      expect(wrapper.state().anchorEl).not.toBeNull();
    });

    it("calls deleteCategory when remove button is clicked", () => {
      const deleteCategory = jest.fn();
      const categories = [{ _id: "abc", name: "test-category-2" }];
      const { wrapper } = TestHelper.getInstanceObjects(
        Drawer,
        { ...props, categories, deleteCategory },
        options
      );

      wrapper.setState({ isEditing: true });
      wrapper.update();
      wrapper.find(".drawer-button-remove-category").simulate("click");
      expect(wrapper.state().isEditing).toEqual(false);
      expect(deleteCategory).toHaveBeenCalledWith("abc");
    });
  });
});
