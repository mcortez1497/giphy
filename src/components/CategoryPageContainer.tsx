import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";

import { Content, Layout } from "components";
import { AppState, getGifs } from "reducers";
import { Gif } from "types";

interface StateProps {
  readonly gifs: Gif[];
}

interface DispatchProps {
  readonly getGifs: () => void;
}

interface RouteProps {
  readonly categoryId: string;
}

interface ComponentProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<RouteProps> {}

class Container extends React.Component<ComponentProps> {
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

const mapStateToProps = (
  state: AppState,
  props: RouteComponentProps<RouteProps>
) => ({
  gifs: state.user.gifs.reduce(
    (gifsWithCategory: Gif[], gif: Gif) =>
      gif.categories &&
      gif.categories.find(
        category => category._id === props.match.params.categoryId
      )
        ? [...gifsWithCategory, gif]
        : gifsWithCategory,
    []
  )
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGifs
    },
    dispatch
  );

export const CategoryPageContainer = connect<
  StateProps,
  DispatchProps,
  RouteComponentProps<RouteProps>,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
