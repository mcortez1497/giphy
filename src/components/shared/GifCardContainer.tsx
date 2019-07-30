import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { GifCard } from "components";
import { AppState, addGif, deleteGif, updateGif } from "reducers";
import { StateUtil } from "services";
import { Category, Gif } from "types";

interface StateProps {
  readonly categories: Category[];
  readonly isAuthenticated: boolean;
}

interface DispatchProps {
  readonly onAdd: (gif: Gif) => void;
  readonly onCategoryChange: (gifId: string, categoryIds: string[]) => void;
  readonly onDelete: (gifId: string) => void;
}

interface OwnProps {
  readonly gif: Gif;
}

const mapStateToProps = (state: AppState, props: OwnProps) => ({
  categories: state.user.categories.items,
  isAuthenticated: StateUtil.isAuthenticated(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onAdd: addGif,
      onCategoryChange: updateGif,
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
