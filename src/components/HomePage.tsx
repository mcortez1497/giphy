import React from "react";

import { Content, InfiniteScroll, Layout } from "components";
import { QueryUtil } from "services";
import { Gif } from "types";

interface Props {
  readonly gifs: Gif[];

  readonly getGifs: (query?: string) => void;
  readonly getMoreGifs: () => void;
}

class HomePage extends React.Component<Props> {
  public componentDidMount() {
    const query = QueryUtil.parseQueryString(window.location.search).q;

    this.props.getGifs(query);
  }

  public render() {
    return (
      <Layout>
        <Content gifs={this.props.gifs} />
        <InfiniteScroll loadMore={this.props.getMoreGifs} />
      </Layout>
    );
  }
}

export { HomePage };
