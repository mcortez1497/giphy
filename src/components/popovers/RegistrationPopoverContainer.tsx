import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { RegistrationPopover } from "components";
import {
  AppState,
  apiRequestClear,
  register,
  UserActionTypes
} from "reducers";
import { StateUtil } from "services";
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
  apiRequest: StateUtil.getApiRequest(state, UserActionTypes.REGISTER)
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
