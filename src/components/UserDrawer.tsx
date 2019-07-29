import React from "react";

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Add, Favorite, Category as CategoryIcon } from "@material-ui/icons";

import { AddCategoryPopover } from "components";
import { Category } from "types";

const styles = (theme: Theme) =>
  createStyles({
    addCategory: {
      padding: theme.spacing(0.5)
    },
    drawer: {
      width: 250
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  });

interface Props extends WithStyles<typeof styles> {
  categories: Category[];
  isOpen: boolean;

  addCategory: (categroyName: string) => void;
  closeDrawer: () => void;
  onMySavedGifsClick: () => void;
}

interface State {
  anchorEl: HTMLButtonElement | null;
}

class UserDrawerWithStyles extends React.Component<Props, State> {
  state = {
    anchorEl: null
  };

  render() {
    const {
      handlePopoverClose,
      handlePopoverOpen,
      viewMyGifs,
      props: { addCategory, categories, classes, closeDrawer, isOpen = false },
      state: { anchorEl }
    } = this;

    const open = Boolean(anchorEl);
    const id = open ? "add-category-popover" : undefined;

    return (
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className={classes.drawer}>
          <ListItem button onClick={viewMyGifs}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary={"My Saved Gifs"} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Categories"} />
            <IconButton
              aria-describedby={id}
              aria-label="add category"
              className={classes.addCategory}
              onClick={handlePopoverOpen}
            >
              <Add />
            </IconButton>
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
              <AddCategoryPopover
                onSubmit={addCategory}
                onClose={handlePopoverClose}
              />
            </Popover>
          </ListItem>
          <List component="div" disablePadding>
            {categories.map((category, index) => (
              <ListItem button key={index} className={classes.nested}>
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    );
  }

  private handlePopoverOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) =>
    this.setState({
      anchorEl: event.currentTarget
    });

  private handlePopoverClose = () =>
    this.setState({
      anchorEl: null
    });

  private viewMyGifs = () => {
    this.props.closeDrawer();
    this.props.onMySavedGifsClick();
  };
}

const UserDrawer = withStyles(styles)(UserDrawerWithStyles);

export { UserDrawer };
