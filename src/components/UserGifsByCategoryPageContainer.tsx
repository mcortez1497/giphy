import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";

import { UserGifsPage } from "components";
import { AppState, getGifs } from "reducers";
import { Gif } from "types";

interface StateProps {
  readonly gifs: Gif[];
  readonly isAuthenticated: boolean;
}

interface DispatchProps {
  readonly getGifs: () => void;
}

interface RouteProps {
  readonly categoryId: string;
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
  ),
  isAuthenticated: state.user.username !== ""
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGifs
    },
    dispatch
  );

export const UserGifsByCategoryPageContainer = connect<
  StateProps,
  DispatchProps,
  RouteComponentProps<RouteProps>,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(UserGifsPage);
