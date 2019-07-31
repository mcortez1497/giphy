import { RegistrationPopover } from "components";
import { defaultApiRequest } from "reducers";
import { TestHelper, TestHelperOptions } from "tests";

const props = {
  apiRequest: defaultApiRequest,
  onClose: jest.fn(),
  onGoBack: jest.fn(),
  onSubmit: jest.fn()
};

describe("RegistrationPopover", () => {
  describe("Rendering", () => {
    let options: TestHelperOptions = {};

    beforeEach(() => {
      options = {
        untilSelector: "RegistrationPopover"
      };
    });

    it("renders correctly", () => {
      const { element } = TestHelper.getInstanceObjects(
        RegistrationPopover,
        props,
        options
      );
      expect(element).toMatchSnapshot();
    });

    it("renders error message if API returns error", () => {
      const { element } = TestHelper.getInstanceObjects(
        RegistrationPopover,
        {
          ...props,
          apiRequest: { ...props.apiRequest, isError: true, message: "oh no!" }
        },
        options
      );
      expect(element).toMatchSnapshot();
    });
  });
});
