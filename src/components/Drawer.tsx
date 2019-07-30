import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Divider,
  Drawer as TemporaryDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Popover,
  WithStyles,
  Typography
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Favorite, Home, RemoveCircle, Settings } from "@material-ui/icons";

import { AddCategoryPopover, EditCategoriesPopover } from "components";
import { Category } from "types";

const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      width: 250
    },
    categoryMessage: {
      flexDirection: "column"
    },
    doneButton: {
      padding: theme.spacing(0),
      margin: theme.spacing(1, -1.5)
    },
    flex: {
      display: "flex"
    },
    grow: {
      flexGrow: 1
    },
    settingsButton: {
      margin: theme.spacing(1, 0)
    },
    title: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: theme.spacing(2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  categories: Category[];
  isOpen: boolean;
  username: string;

  addCategory: (categoryName: string) => void;
  closeDrawer: () => void;
  deleteCategory: (categoryId: string) => void;
}

interface State {
  anchorEl: HTMLButtonElement | null;
  isAddingCategory: boolean;
  isEditing: boolean;
}

class DrawerWithStyles extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    isAddingCategory: false,
    isEditing: false
  };

  render() {
    const {
      handleCategoryRemoveClick,
      handlePopoverClose,
      handlePopoverOpen,
      toggleEditMode,
      togglePopover,
      props: {
        addCategory,
        categories,
        classes,
        closeDrawer,
        isOpen = false,
        username
      },
      state: { anchorEl, isAddingCategory, isEditing }
    } = this;

    const open = Boolean(anchorEl);
    const id = open ? "add-category-popover" : undefined;
    const hasCategories = categories.length > 0;

    return (
      <TemporaryDrawer open={isOpen} onClose={closeDrawer}>
        <div className={classes.drawer}>
          <ListItem className={classes.title}>
            <Typography variant="subtitle1">Welcome back,</Typography>
            <Typography variant="h5" color="primary">
              {username}
            </Typography>
            {/* <Typography variant="h5" color="primary">
              GIF Viewer
            </Typography>
            <Typography variant="caption">
              By Michael Cortez for H-E-B
            </Typography> */}
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/" onClick={closeDrawer}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button component={Link} to="/my-gifs" onClick={closeDrawer}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary={"My Saved Gifs"} />
          </ListItem>
          <Divider />
          <ListSubheader className={classes.flex}>
            <span className={classes.grow}>Categories</span>
            {isEditing && (
              <Button
                color="primary"
                className={classes.doneButton}
                onClick={toggleEditMode}
              >
                Done
              </Button>
            )}
            {!isEditing && (
              <IconButton
                size="small"
                aria-describedby={id}
                aria-label="settings"
                className={classes.settingsButton}
                onClick={handlePopoverOpen}
              >
                <Settings />
              </IconButton>
            )}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "left"
              }}
            >
              {isAddingCategory ? (
                <AddCategoryPopover
                  onSubmit={addCategory}
                  onClose={handlePopoverClose}
                />
              ) : (
                <EditCategoriesPopover
                  hasCategories={hasCategories}
                  onClose={handlePopoverClose}
                  onAddClick={togglePopover}
                  onRemoveClick={toggleEditMode}
                />
              )}
            </Popover>
          </ListSubheader>
          {hasCategories && (
            <List disablePadding>
              {categories.map((category, index) => (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={`/categories/${category._id}`}
                  onClick={closeDrawer}
                >
                  <ListItemText primary={category.name} />
                  {isEditing && (
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={handleCategoryRemoveClick(category._id)}
                      >
                        <RemoveCircle />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </List>
          )}
          {!hasCategories && (
            <ListItem
              className={classes.categoryMessage}
              style={{ color: "#9e9e9e" }}
            >
              <Typography variant="h6">No categories yet</Typography>
              <Typography variant="subtitle2">
                Click the Settings icon to add one
              </Typography>
            </ListItem>
          )}
        </div>
      </TemporaryDrawer>
    );
  }

  private handleCategoryRemoveClick = (categoryId: string) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // If the user is deleting their last category, they're done editing
    if (this.props.categories.length === 1) {
      this.setState({
        isEditing: false
      });
    }
    this.props.deleteCategory(categoryId);

    // If the user deletes the category of the page they are re currently on,
    // redirect the user home
    if (window.location.pathname.indexOf(categoryId) > -1) {
      window.location.href = "/";
    }
  };

  private handlePopoverOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) =>
    this.setState({
      anchorEl: event.currentTarget
    });

  private handlePopoverClose = () =>
    this.setState({
      anchorEl: null,
      isAddingCategory: false
    });

  private togglePopover = () =>
    this.setState((prevState: State) => ({
      isAddingCategory: !prevState.isAddingCategory
    }));

  private toggleEditMode = () => {
    this.setState((prevState: State) => ({
      isEditing: !prevState.isEditing
    }));
  };
}

const Drawer = withStyles(styles)(DrawerWithStyles);

export { Drawer };
