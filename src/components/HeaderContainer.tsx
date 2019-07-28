import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Header } from "components";
import {
  AppState,
  getGifs,
  getUser,
  getUserGifs,
  login,
  logout,
  register,
  setDrawerOpen,
  UserAction
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
  readonly getUser: () => void;
  readonly getUserGifs: () => void;
}

interface ComponentProps extends StateProps, DispatchProps {}

class Container extends React.Component<ComponentProps> {
  public componentDidMount() {
    this.props.getUser()
  }

  public render() {
    const { getUser, getUserGifs, ...props } = this.props;
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
      getUser: getUser,
      getUserGifs: getUserGifs
    },
    dispatch
  );

export const HeaderContainer = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Container);