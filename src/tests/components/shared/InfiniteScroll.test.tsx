import { InfiniteScroll } from "components";
import { TestHelper, TestHelperOptions } from "tests";

const props = {
    loadMore: jest.fn()
};

describe("InfiniteScroll", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
          untilSelector: "InfiniteScroll"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
          InfiniteScroll,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });
  });
});
