import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import { ContentContainer, HeaderContainer, UserDrawerContainer } from "components";
import { store } from "reducers";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#9ccc65"
    },
    secondary: {
      main: "#40c4ff"
    },
    background: {
      default: "#303030"
    }
  }
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <HeaderContainer />
          <ContentContainer />
          <UserDrawerContainer />
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
