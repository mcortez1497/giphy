import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Header } from "components";
import {
  AppState,
  getGifs,
  getUserGifs,
  login,
  logout,
  profile,
  register,
  setDrawerOpen
} from "reducers";

interface StateProps {
  readonly username: string;
}

interface DispatchProps {
  readonly onLogin: (username: string, password: string) => void;
  readonly onLogout: () => void;
  readonly onMenuClick: () => void;
  readonly onRegister: (username: string, password: string) => void;
  readonly onSearch: (query?: string) => void;
  readonly getProfile: () => void;
  readonly getUserGifs: () => void;
}

interface ComponentProps extends StateProps, DispatchProps {}

class Container extends React.Component<ComponentProps> {
  public componentDidMount() {
    this.props.getProfile();
  }

  public render() {
    const { getProfile, ...props } = this.props;
    return <Header {...props} />;
  }
}

const mapStateToProps = (state: AppState) => ({
  username: state.user.username
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onLogin: login,
      onLogout: logout,
      onMenuClick: setDrawerOpen,
      onRegister: register,
      onSearch: getGifs,
      getProfile: profile,
      getUserGifs: getUserGifs
    },
    dispatch
  );

export const HeaderContainer = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
