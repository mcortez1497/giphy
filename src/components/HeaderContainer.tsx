import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { AppState, login, logout, profile, register } from "reducers";

import { Header } from "components";

interface StateProps {
  readonly username: string;
}

interface DispatchProps {
  readonly onLogin: (username: string, password: string) => void;
  readonly onLogout: () => void;
  readonly onRegister: (username: string, password: string) => void;
  readonly getProfile: () => void;
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
      onRegister: register,
      getProfile: profile
    },
    dispatch
  );

export const HeaderContainer = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
