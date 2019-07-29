import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { HomePage } from "components";
import { AppState, getGifs, getMoreGifs } from "reducers";
import { Gif } from "types";

interface StateProps {
  readonly gifs: Gif[];
}

interface DispatchProps {
  readonly getGifs: (query?: string) => void;
  readonly getMoreGifs: () => void;
}

const mapStateToProps = (state: AppState) => {
  const gifs = state.gifs.items.map(gif => {
    const userGif = state.user.gifs.find(
      userGif => userGif.giphy_id === gif.giphy_id
    );
    return userGif ? userGif : gif;
  });

  return { gifs };
};

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
