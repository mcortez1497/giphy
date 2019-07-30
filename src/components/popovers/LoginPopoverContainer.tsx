import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { LoginPopover } from "components";
import {
  AppState,
  apiRequestClear,
  defaultApiRequest,
  login,
  UserActionTypes
} from "reducers";
import { ApiRequest } from "types";

interface StateProps {
  readonly apiRequest: ApiRequest;
  readonly didRegister: boolean;
}

interface DispatchProps {
  readonly onClose: () => void;
  readonly onSubmit: (username: string, password: string) => void;
}

interface OwnProps {
  readonly onSignUp: () => void;
}

const mapStateToProps = (state: AppState) => ({
  apiRequest: state.api[UserActionTypes.LOGIN] || defaultApiRequest,
  didRegister: state.ui.didRegister
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onClose: () => apiRequestClear(UserActionTypes.LOGIN),
      onSubmit: login
    },
    dispatch
  );

export const LoginPopoverContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(LoginPopover);
