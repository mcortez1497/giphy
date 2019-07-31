import { CategorySelector } from "components";
import { TestHelper, TestHelperOptions } from "tests";
import { Category, Gif } from "types";

const props = {
  categories: [{ _id: "123", name: "abc" } as Category],
  gif: {
    _id: "123",
    giphy_id: "giphy_123",
    fixed_url: "fixed_url",
    original_url: "original_url",
    title: "test",
    height: "100",
    categories: []
  } as Gif,
  onCategorySelect: jest.fn()
};

describe("CategorySelector", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "CategorySelector"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        CategorySelector,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly with no categories", () => {
      const { element } = TestHelper.getInstanceObjects(
        CategorySelector,
        { ...props, categories: [] },
        options
      );
      expect(element).toMatchSnapshot();
    });
  });
});
