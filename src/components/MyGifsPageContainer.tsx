import * as React from "react";
import { connect } from "react-redux";
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

interface ComponentProps extends StateProps, DispatchProps {}

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

const mapStateToProps = (state: AppState) => ({
  gifs: state.user.gifs
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGifs
    },
    dispatch
  );

export const MyGifsPageContainer = connect<
  StateProps,
  DispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
