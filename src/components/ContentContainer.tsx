import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Content } from "components";
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
    return <Content gifs={this.props.gifs} />;
  }
}

const mapStateToProps = (state: AppState) => {
  const gifs = state.ui.gifView === "fresh" ? state.gifs.items.map((gif) => {
    const userGif = state.user.gifs.find(userGif => userGif.giphy_id === gif.giphy_id)
    return userGif ? userGif : gif;
  }) : state.user.gifs

  return { gifs }
}
// {
// gifs: state.ui.gifView === "fresh" ? state.gifs.items : state.user.gifs
// }

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGifs
    },
    dispatch
  );

export const ContentContainer = connect<
  StateProps,
  DispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
