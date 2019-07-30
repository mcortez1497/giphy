import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";

import { UserGifsPage } from "components";
import { AppState, getGifs, UserActionTypes } from "reducers";
import { StateUtil } from "services";
import { ApiRequest, Gif } from "types";

interface StateProps {
  readonly apiRequest: ApiRequest;
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
  apiRequest: StateUtil.getApiRequest(state, UserActionTypes.GET_USER_GIFS),
  gifs: StateUtil.getSavedGifsByCategory(state, props.match.params.categoryId),
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
