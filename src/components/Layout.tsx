import React from "react";

import { HeaderContainer, UserDrawerContainer } from "components";

const Layout: React.FC = ({ children }) => (
  <React.Fragment>
    <HeaderContainer />
    {children}
    <UserDrawerContainer />
  </React.Fragment>
);

export { Layout };
