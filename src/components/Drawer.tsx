import React from "react";
import { Link } from "react-router-dom";

import {
  Divider,
  Drawer as TemporaryDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  WithStyles,
  Typography
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
  Add,
  Category as CategoryIcon,
  Favorite,
  Home
} from "@material-ui/icons";

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

  addCategory: (categroyName: string) => void;
  closeDrawer: () => void;
}

interface State {
  anchorEl: HTMLButtonElement | null;
}

class DrawerWithStyles extends React.Component<Props, State> {
  state = {
    anchorEl: null
  };

  render() {
    const {
      handlePopoverClose,
      handlePopoverOpen,
      props: { addCategory, categories, classes, closeDrawer, isOpen = false },
      state: { anchorEl }
    } = this;

    const open = Boolean(anchorEl);
    const id = open ? "add-category-popover" : undefined;

    return (
      <TemporaryDrawer open={isOpen} onClose={closeDrawer}>
        <div className={classes.drawer}>
          <ListItem className={classes.title}>
            <Typography variant="h5" color="primary">
              GIF Viewer
            </Typography>
            <Typography variant="caption">
              By Michael Cortez for H-E-B
            </Typography>
          </ListItem>
          <Divider />
          <ListItem
            button
            component={Link}
            to="/"
            onClick={closeDrawer}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/my-gifs"
            onClick={closeDrawer}
          >
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
              <ListItem
                button
                key={index}
                className={classes.nested}
                component={Link}
                to={`/categories/${category._id}`}
                onClick={closeDrawer}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </TemporaryDrawer>
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
}

const Drawer = withStyles(styles)(DrawerWithStyles);

export { Drawer };
