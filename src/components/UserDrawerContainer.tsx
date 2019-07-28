import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { UserDrawer } from "components"
import { AppState, getUserGifs, setDrawerClosed } from "reducers";

interface StateProps {
  readonly isOpen: boolean;
}

interface DispatchProps {
  readonly closeDrawer: () => void;
  readonly getUserGifs: () => void;
}

const mapStateToProps = (state: AppState) => ({
  isOpen: state.ui.isDrawerOpen
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      closeDrawer: setDrawerClosed,
      getUserGifs: getUserGifs
    },
    dispatch
  );

export const UserDrawerContainer = connect<
  StateProps,
  DispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(UserDrawer);
