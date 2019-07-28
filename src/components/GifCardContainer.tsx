import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { GifCard } from "components";
import { AppState, deleteGif, saveGif } from "reducers";
import { Gif } from "types";

interface StateProps {
  readonly isSaved: boolean;
}

interface DispatchProps {
  readonly onAdd: (gif: Gif) => void;
  readonly onDelete: (gif: Gif) => void;
}

interface OwnProps {
  readonly gif: Gif;
}

const mapStateToProps = (state: AppState, props: OwnProps) => ({
  isSaved:
    Boolean(props.gif._id) ||
    state.user.gifs.filter(gif => gif.giphy_id === props.gif.giphy_id).length > 0
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onAdd: saveGif,
      onDelete: deleteGif
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
