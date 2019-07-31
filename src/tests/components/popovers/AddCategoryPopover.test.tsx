import React from "react";

import { AddCategoryPopover } from "components";
import { TestHelper, TestHelperOptions } from "tests";

const props = {
  onClose: jest.fn(),
  onSubmit: jest.fn()
};

describe("AddCategoryPopover", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "AddCategoryPopover"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        AddCategoryPopover,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly if category name is set", () => {
      const { wrapper } = TestHelper.getInstanceObjects(
        AddCategoryPopover,
        props,
        options
      );
      wrapper.setState({ categoryName: "test" });
      wrapper.update();
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe("Class and Prop Methods", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "AddCategoryPopover"
      };
    });

    it("submits and closes properly", () => {
      const onClose = jest.fn();
      const onSubmit = jest.fn();
      const { wrapper } = TestHelper.getInstanceObjects(
        AddCategoryPopover,
        { ...props, onClose, onSubmit },
        options
      );

      // Submit should not occur when category name is an empty string
      wrapper.find("#popover-add-category-input").simulate("keypress", { key: "Enter" });
      expect(onSubmit).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();

      wrapper.setState({ categoryName: "test" });
      wrapper.update();

      // Submit should succeed now
      wrapper.find("#popover-add-category-input").simulate("keypress", { key: "Enter" });
      expect(onSubmit).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
