import { ContentForTesting as Content } from "components";
import { TestHelper, TestHelperOptions } from "tests";
import { defaultApiRequest } from "reducers";
import { Gif } from "types";

const props = {
  apiRequest: defaultApiRequest,
  gifs: [
    {
      _id: "123",
      giphy_id: "giphy_123",
      fixed_url: "fixed_url",
      original_url: "original_url",
      title: "test",
      height: "100",
      categories: []
    } as Gif
  ],
  showEmptyMessage: false
};

describe("Content", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "Container"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        Content,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly with no gifs", () => {
      const { element } = TestHelper.getInstanceObjects(
        Content,
        { ...props, gifs: [] },
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders correctly with no gifs and show flag set", () => {
      const { element } = TestHelper.getInstanceObjects(
        Content,
        { ...props, gifs: [], showEmptyMessage: true },
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders error if Api request returns error", () => {
      const { element } = TestHelper.getInstanceObjects(
        Content,
        {
          ...props,
          apiRequest: { ...props.apiRequest, isError: true, message: "uh oh!" }
        },
        options
      );
      expect(element).toMatchSnapshot();
    });
  });
});
