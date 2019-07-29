import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import {
  CategoryPageContainer,
  HomePageContainer,
  MyGifsPageContainer
} from "components";
import { store } from "reducers";

const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#9ccc65"
    },
    secondary: {
      main: "#ff5252"
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
          <Router history={history}>
            <Switch>
              <Route
                path="/categories/:categoryId"
                component={CategoryPageContainer}
              />
              <Route path="/my-gifs" component={MyGifsPageContainer} />
              <Route path="/" exact component={HomePageContainer} />
              <Redirect from="/*" to="/" />
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
