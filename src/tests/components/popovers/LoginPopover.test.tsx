import { LoginPopover } from "components";
import { defaultApiRequest } from "reducers";
import { TestHelper, TestHelperOptions } from "tests";

const props = {
  apiRequest: defaultApiRequest,
  didRegister: false,
  onClose: jest.fn(),
  onSignUp: jest.fn(),
  onSubmit: jest.fn()
};

describe("LoginPopover", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "LoginPopover"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        LoginPopover,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders with message if user registered", () => {
      const { element } = TestHelper.getInstanceObjects(
        LoginPopover,
        { ...props, didRegister: true },
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders error message if API returns error", () => {
      const { element } = TestHelper.getInstanceObjects(
        LoginPopover,
        {
          ...props,
          apiRequest: {
            ...props.apiRequest,
            isError: true,
            message: "oh no!"
          }
        },
        options
      );
      expect(element).toMatchSnapshot();
    });
  });
});
