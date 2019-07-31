import { TestHelper } from "tests";

import { UserGifsPage } from "components";
import { defaultApiRequest } from "reducers";
import { Gif } from "types";

const props = {
  apiRequest: defaultApiRequest,
  gifs: [] as Gif[],
  isAuthenticated: true
};

describe("UserGifsPage", () => {
  it("renders correctly", () => {
    const { element } = TestHelper.getInstanceObjects(
      UserGifsPage,
      props
    );
    expect(element).toMatchSnapshot();
  });

  it("renders Redirect if not authenticated", () => {
    const { element } = TestHelper.getInstanceObjects(
      UserGifsPage,
      { ...props, isAuthenticated: false }
    );
    expect(element).toMatchSnapshot();
  });
});
