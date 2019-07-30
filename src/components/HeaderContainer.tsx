import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Header } from "components";
import {
  AppState,
  getGifs,
  getUser,
  logout,
  register,
  setDrawerOpen
} from "reducers";
import { QueryUtil } from "services";

interface StateProps {
  readonly username: string;
}

interface DispatchProps {
  readonly onLogout: () => void;
  readonly onMenuClick: () => void;
  readonly onRegister: (username: string, password: string) => void;
  readonly onSearch: (query?: string) => void;
  readonly getUser: () => void;
}

interface ComponentProps extends StateProps, DispatchProps {}

class Container extends React.Component<ComponentProps> {
  public componentDidMount() {
    this.props.getUser();
  }

  public render() {
    const {
      props: { getUser, ...rest }
    } = this;
   
    const searchValue = QueryUtil.parseQueryString(window.location.search).q || "";

    return <Header initialSearchValue={searchValue} {...rest} />;
  }
}

const mapStateToProps = (state: AppState) => ({
  username: state.user.username
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onLogout: logout,
      onMenuClick: setDrawerOpen,
      onRegister: register,
      onSearch: getGifs,
      getUser: getUser
    },
    dispatch
  );

export const HeaderContainer = connect<StateProps, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(Container);
