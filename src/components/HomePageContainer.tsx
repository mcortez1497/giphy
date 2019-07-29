import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Content, InfiniteScroll, Layout } from "components";
import { AppState, getGifs, getMoreGifs } from "reducers";
import { QueryUtil } from "services";
import { Gif } from "types";

interface StateProps {
  readonly gifs: Gif[];
  readonly query: string;
}

interface DispatchProps {
  readonly getGifs: (query?: string) => void;
  readonly getMoreGifs: () => void;
}

interface ComponentProps extends StateProps, DispatchProps {}

class Container extends React.Component<ComponentProps> {

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

const mapStateToProps = (state: AppState) => {
  const gifs = state.gifs.items.map(gif => {
    const userGif = state.user.gifs.find(
      userGif => userGif.giphy_id === gif.giphy_id
    );
    return userGif ? userGif : gif;
  });

  return { gifs, query: state.gifs.query };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGifs,
      getMoreGifs
    },
    dispatch
  );

export const HomePageContainer = connect<
  StateProps,
  DispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
