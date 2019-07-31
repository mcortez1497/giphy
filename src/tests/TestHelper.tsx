import React, { ReactType } from "react";
import { shallow } from "tests/enzymeWrapper";
import { createShallow } from "@material-ui/core/test-utils";

export interface TestHelperOptions {
  disableLifecycleMethods?: boolean;
  untilSelector?: string;
}

class TestHelper {
  defaultOptions: TestHelperOptions = {
    disableLifecycleMethods: true
  };

  public getInstanceObjects(
    Component: ReactType,
    newProps = {},
    options?: TestHelperOptions
  ) {
    const opts: TestHelperOptions = { ...this.defaultOptions, ...options };

    let shallowMethod = shallow;

    // The "untilSelector" option is unique to Material-UI's createShallow method,
    // so if it's preset, us that instead.
    if (opts.untilSelector) {
      shallowMethod = createShallow({
        untilSelector: opts.untilSelector
      });
    }

    const wrapper = shallowMethod(<Component {...newProps} />, {
      disableLifecycleMethods: opts.disableLifecycleMethods
    });
    const instance = wrapper.instance() as React.Component;
    const element = wrapper.getElement();
    return { wrapper, instance, element };
  }
}

const TestHelperSingleton = new TestHelper();
export { TestHelperSingleton as TestHelper };
