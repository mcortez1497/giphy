import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Header } from "components";
import { AppState, getGifs, getUser, logout, setDrawerOpen } from "reducers";

interface StateProps {
  readonly username: string;
}

interface DispatchProps {
  readonly getUser: () => void;
  readonly onLogout: () => void;
  readonly onMenuClick: () => void;
  readonly onSearch: (query?: string) => void;
}

const mapStateToProps = (state: AppState) => ({
  username: state.user.username
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onLogout: logout,
      onMenuClick: setDrawerOpen,
      onSearch: getGifs,
      getUser: getUser
    },
    dispatch
  );

export const HeaderContainer = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Header);
