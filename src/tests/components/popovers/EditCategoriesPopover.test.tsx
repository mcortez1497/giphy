import { EditCategoriesPopover } from "components";
import { TestHelper } from "tests";

const props = {
  hasCategories: true,
  onClose: jest.fn(),
  onAddClick: jest.fn(),
  ronRemoveClick: jest.fn()
};

describe("EditCategoriesPopover", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        EditCategoriesPopover,
        props
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly if there are no categories", () => {
      const { element } = TestHelper.getInstanceObjects(EditCategoriesPopover, {
        ...props,
        hasCategories: false
      });
      expect(element).toMatchSnapshot();
    });
  });
});
