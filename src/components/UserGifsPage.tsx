import React from "react";

import { Content, Layout } from "components";
import { Gif } from "types";

interface Props {
  readonly gifs: Gif[];

  readonly getGifs: (query?: string) => void;
}

class UserGifsPage extends React.Component<Props> {
  public componentDidMount() {
    this.props.getGifs();
  }

  public render() {
    return (
      <Layout>
        <Content gifs={this.props.gifs} />
      </Layout>
    );
  }
}

export { UserGifsPage };
