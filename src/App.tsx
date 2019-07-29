import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ThemeProvider } from "@material-ui/styles";

import {
  HomePageContainer,
  UserGifsPageContainer,
  UserGifsByCategoryPageContainer
} from "components";
import { store } from "reducers";

import { theme } from "./theme"; 

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              <Route
                path="/categories/:categoryId"
                component={UserGifsByCategoryPageContainer}
              />
              <Route path="/my-gifs" component={UserGifsPageContainer} />
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
