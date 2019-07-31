import React from "react";
import { shallow } from "tests/enzymeWrapper";

import { Layout } from "components";

describe("Layout", () => {
  it("renders correctly", () => {
    const element = shallow(<Layout />).getElement();
    expect(element).toMatchSnapshot();
  });
});
