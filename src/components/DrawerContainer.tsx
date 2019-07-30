import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Drawer } from "components"
import { AppState, addCategory, deleteCategory, setDrawerClosed } from "reducers";
import { StateUtil } from "services";
import { Category } from "types";

interface StateProps {
  readonly categories: Category[];
  readonly isOpen: boolean;
  readonly username: string;
}

interface DispatchProps {
  readonly addCategory: (categoryName: string) => void;
  readonly closeDrawer: () => void;
  readonly deleteCategory: (categoryId: string) => void;
}

const mapStateToProps = (state: AppState) => ({
  categories: StateUtil.getSortedCategories(state),
  isOpen: state.ui.isDrawerOpen,
  username: state.user.username
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addCategory,
      closeDrawer: setDrawerClosed,
      deleteCategory
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
