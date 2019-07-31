import { TestHelper } from "tests";

import { HomePage } from "components";
import { defaultApiRequest } from "reducers";
import { Gif } from "types";

const props = {
  apiRequest: defaultApiRequest,
  gifs: [] as Gif[],
  query: "",
  getGifs: jest.fn(),
  getMoreGifs: jest.fn()
};

describe("HomePage", () => {
  it("renders correctly", () => {
    const { element } = TestHelper.getInstanceObjects(HomePage, props);
    expect(element).toMatchSnapshot();
  });

  it("renders without InfiniteScroll if in error state", () => {
    const { element } = TestHelper.getInstanceObjects(HomePage, {
      ...props,
      apiRequest: {
        ...props.apiRequest,
        isError: true
      }
    });
    expect(element).toMatchSnapshot();
  });

  it("fetches data on componentDidMount", () => {
    const query = "test";

    TestHelper.getInstanceObjects(
      HomePage,
      { ...props, query },
      {
        disableLifecycleMethods: false
      }
    );

    expect(props.getGifs).toHaveBeenCalledWith(query);
  });
});
