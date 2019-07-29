import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { UserGifsPage } from "components";
import { AppState, getGifs } from "reducers";
import { Gif } from "types";

interface StateProps {
  readonly gifs: Gif[];
}

interface DispatchProps {
  readonly getGifs: () => void;
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

export const UserGifsPageContainer = connect<
  StateProps,
  DispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(UserGifsPage);
