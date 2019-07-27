import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { GifCard } from "components";
import { AppState, saveGif } from "reducers";
import { Gif } from "types";

interface StateProps {}

interface DispatchProps {
  readonly onSelect: (gif: Gif) => void;
}

interface OwnProps {
  readonly gif: Gif;
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onSelect: saveGif
    },
    dispatch
  );

export const GifCardContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(GifCard);
