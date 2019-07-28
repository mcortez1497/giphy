import React from "react";

import { Drawer, ListItem, ListItemText, WithStyles } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  closeDrawer: () => void;
  getUserGifs: () => void;
}

class UserDrawerWithStyles extends React.Component<Props> {
  render() {
    const {
      getUserGifs,
      props: { closeDrawer, isOpen = false }
    } = this;
    return (
      <Drawer open={isOpen} onClose={closeDrawer}>
        <ListItem button onClick={getUserGifs}>
          <ListItemText primary={"My Saved Gifs"} />
        </ListItem>
      </Drawer>
    );
  }

  private getUserGifs = () => {
    this.props.closeDrawer();
    this.props.getUserGifs();
  };
}

const UserDrawer = withStyles(styles)(UserDrawerWithStyles);

export { UserDrawer };
