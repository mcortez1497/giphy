import React from "react";

import { HeaderContainer, DrawerContainer } from "components";

const Layout: React.FC = ({ children }) => (
  <React.Fragment>
    <HeaderContainer />
    {children}
    <DrawerContainer />
  </React.Fragment>
);

export { Layout };
