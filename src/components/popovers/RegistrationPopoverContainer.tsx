import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { RegistrationPopover } from "components";
import {
  AppState,
  apiRequestClear,
  defaultApiRequest,
  register,
  UserActionTypes
} from "reducers";
import { ApiRequest } from "types";

interface StateProps {
  readonly apiRequest: ApiRequest;
}

interface DispatchProps {
  readonly onClose: () => void;
  readonly onSubmit: (username: string, password: string) => void;
}

interface OwnProps {
  readonly onGoBack: () => void;
}

const mapStateToProps = (state: AppState) => ({
  apiRequest: state.api[UserActionTypes.REGISTER] || defaultApiRequest
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onClose: () => apiRequestClear(UserActionTypes.REGISTER),
      onSubmit: register
    },
    dispatch
  );

export const RegistrationPopoverContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPopover);
