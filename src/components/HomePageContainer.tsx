import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { HomePage } from "components";
import { AppState, getGifs, getMoreGifs, GifActionTypes } from "reducers";
import { QueryUtil, StateUtil } from "services";
import { ApiRequest, Gif } from "types";

interface StateProps {
  readonly apiRequest: ApiRequest;
  readonly gifs: Gif[];
  readonly query: string;
}

interface DispatchProps {
  readonly getGifs: (query?: string) => void;
  readonly getMoreGifs: () => void;
}

const mapStateToProps = (state: AppState) => ({
  apiRequest: StateUtil.getApiRequest(state, GifActionTypes.GET_GIFS),
  gifs: StateUtil.getFreshGifsMergedWithSavedGifs(state),
  query: QueryUtil.parseQueryString(window.location.search).q || ""
});

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
)(HomePage);
