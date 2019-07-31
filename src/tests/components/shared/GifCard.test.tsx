import { GifCard } from "components";
import { TestHelper, TestHelperOptions } from "tests";
import { Gif, Category } from "types";

const props = {
  categories: [] as Category[],
  gif: {
    giphy_id: "giphy_123",
    fixed_url: "fixed_url",
    original_url: "original_url",
    title: "test",
    height: "100",
    categories: []
  } as Gif,
  isAuthenticated: false,
  onAdd: jest.fn(),
  onCategoryChange: jest.fn(),
  onDelete: jest.fn()
};

describe("Content", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "GifCard"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        GifCard,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly when authenticated", () => {
      const { element } = TestHelper.getInstanceObjects(
        GifCard,
        { ...props, isAuthenticated: true },
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly when authenticated and saved", () => {
      const { element } = TestHelper.getInstanceObjects(
        GifCard,
        { ...props, gif: { ...props.gif, _id: "123" }, isAuthenticated: true },
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly when saved with categories", () => {
      const { element } = TestHelper.getInstanceObjects(
        GifCard,
        {
          ...props,
          gif: { ...props.gif, _id: "123" },
          categories: [{ _id: "123", name: "abc" }],
          isAuthenticated: true
        },
        options
      );
      expect(element).toMatchSnapshot();
    });
  });
});
