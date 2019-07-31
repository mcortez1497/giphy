import { SearchBarForTesting as SearchBar } from "components";
import { TestHelper, TestHelperOptions } from "tests";

const props = {
  initialValue: "",
  onSearch: jest.fn()
};

describe("SearchBar", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "SearchBar"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        SearchBar,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders with initial value", () => {
      const { wrapper } = TestHelper.getInstanceObjects(
        SearchBar,
        { ...props, initialValue: "test" },
        options
      );
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});
