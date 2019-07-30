import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Drawer } from "components"
import { AppState, addCategory, setDrawerClosed } from "reducers";
import { StateUtil } from "services";
import { Category } from "types";

interface StateProps {
  readonly categories: Category[];
  readonly isOpen: boolean;
}

interface DispatchProps {
  readonly addCategory: (categoryName: string) => void;
  readonly closeDrawer: () => void;
}

const mapStateToProps = (state: AppState) => ({
  categories: StateUtil.getSortedCategories(state),
  isOpen: state.ui.isDrawerOpen
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addCategory,
      closeDrawer: setDrawerClosed
    },
    dispatch
  );

export const DrawerContainer = connect<
  StateProps,
  DispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
