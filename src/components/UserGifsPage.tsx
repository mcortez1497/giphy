import React from "react";
import { Redirect } from "react-router";

import { Content, Layout } from "components";
import { Gif } from "types";

interface Props {
  readonly gifs: Gif[];
  readonly isAuthenticated: boolean;
}

class UserGifsPage extends React.Component<Props> {
  public render() {
    const {
      props: { gifs, isAuthenticated }
    } = this;

    return !isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <Layout>
        <Content gifs={gifs} />
      </Layout>
    );
  }
}

export { UserGifsPage };
