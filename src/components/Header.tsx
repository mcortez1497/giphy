import React from "react";

import {
  AppBar,
  Button,
  IconButton,
  Popover,
  Toolbar,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";

import {
  LoginPopoverContainer,
  RegistrationPopoverContainer,
  SearchBar
} from "components";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: "#303030",
      color: "#9ccc65"
    },
    grow: {
      flexGrow: 1
    },
    toolBar: {
      justifyContent: "space-between"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  initialSearchValue: string;
  username: string;

  onLogout: () => void;
  onMenuClick: () => void;
  onRegister: (username: string, password: string) => void;
  onSearch: (query?: string) => void;
}

interface State {
  anchorEl: HTMLButtonElement | null;
  isRegistering: boolean;
}

class HeaderWithStyles extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    isRegistering: false
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.username !== this.props.username) {
      this.setState({ anchorEl: null });
    }
  }

  render() {
    const {
      handleLogout,
      handlePopoverClose,
      handlePopoverOpen,
      handleSearch,
      togglePopover,
      props: { classes, initialSearchValue, onMenuClick, username },
      state: { anchorEl, isRegistering }
    } = this;

    const open = Boolean(anchorEl);
    const id = open ? "login-popover" : undefined;
    const isAuthenticated = Boolean(username);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            {isAuthenticated && (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={onMenuClick}
              >
                <Menu />
              </IconButton>
            )}
            <SearchBar
              initialValue={initialSearchValue}
              onSearch={handleSearch}
            />
            <div className={classes.grow} />
            {isAuthenticated && (
              <Button color="inherit" onClick={handleLogout}>
                Log out
              </Button>
            )}
            {!isAuthenticated && (
              <React.Fragment>
                <Button
                  aria-describedby={id}
                  color="inherit"
                  onClick={handlePopoverOpen}
                >
                  Log in
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                >
                  {isRegistering ? (
                    <RegistrationPopoverContainer onGoBack={togglePopover} />
                  ) : (
                    <LoginPopoverContainer onSignUp={togglePopover} />
                  )}
                </Popover>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private handleLogout = () => this.props.onLogout();

  private handlePopoverOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) =>
    this.setState({
      anchorEl: event.currentTarget
    });

  private handlePopoverClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  private handleSearch = (query: string = "") => {
    this.props.onSearch(query);
  };

  private togglePopover = () =>
    this.setState((prevState: State) => ({
      isRegistering: !prevState.isRegistering
    }));
}

const Header = withStyles(styles)(HeaderWithStyles);

export { Header };
