import React from "react";
import { Redirect } from "react-router";

import { Content, Layout } from "components";
import { ApiRequest, Gif } from "types";

interface Props {
  readonly apiRequest: ApiRequest;
  readonly gifs: Gif[];
  readonly isAuthenticated: boolean;
}

class UserGifsPage extends React.Component<Props> {
  public render() {
    const { isAuthenticated } = this.props;

    return !isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <Layout>
        <Content {...this.props} allowTrim={false} />
      </Layout>
    );
  }
}

export { UserGifsPage };
