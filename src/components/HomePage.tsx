import React from "react";

import { Content, InfiniteScroll, Layout } from "components";
import { ApiRequest, Gif } from "types";

interface Props {
  readonly apiRequest: ApiRequest;
  readonly gifs: Gif[];
  readonly isAuthenticated: boolean;
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
      props: { getGifs, getMoreGifs, query, ...rest }
    } = this;
    const isError = this.props.apiRequest.isError;

    return (
      <Layout>
        <Content {...rest} showEmptyMessage={false} allowTrim={true} />
        {!isError && (
          <InfiniteScroll loadMore={getMoreGifs} />
        )}
      </Layout>
    );
  }
}

export { HomePage };
