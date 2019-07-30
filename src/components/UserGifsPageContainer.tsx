import { connect } from "react-redux";
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

const mapStateToProps = (state: AppState) => ({
  apiRequest: StateUtil.getApiRequest(state, UserActionTypes.GET_USER_GIFS),
  gifs: state.user.gifs,
  isAuthenticated: state.user.username !== ""
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGifs
    },
    dispatch
  );

export const UserGifsPageContainer = connect<
  StateProps,
  DispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(UserGifsPage);
