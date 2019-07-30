import React from "react";

import { Content, InfiniteScroll, Layout } from "components";
import { ApiRequest, Gif } from "types";

interface Props {
  readonly apiRequest: ApiRequest;
  readonly gifs: Gif[];
  readonly query: string;

  readonly getGifs: (query?: string) => void;
  readonly getMoreGifs: () => void;
}

class HomePage extends React.Component<Props> {
  public componentDidMount() {
    this.props.getGifs(this.props.query);
  }

  public render() {
    const {
      props: { apiRequest, gifs, getMoreGifs }
    } = this;

    return (
      <Layout>
        <Content apiRequest={apiRequest} gifs={gifs} showEmptyMessage={false} />
        {!apiRequest.isError && <InfiniteScroll loadMore={getMoreGifs} />}
      </Layout>
    );
  }
}

export { HomePage };
