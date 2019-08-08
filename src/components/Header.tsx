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
import { AccountCircle, ExitToApp, Menu } from "@material-ui/icons";

import {
  LoginPopoverContainer,
  RegistrationPopoverContainer,
  SearchBar
} from "components";
import { QueryUtil } from "services";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: "#303030",
      color: "#9ccc65"
    },
    button: {
      margin: theme.spacing(2, 0, 2, 2),
      padding: theme.spacing(1, 2)
    },
    buttonIconLeft: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(0)
      }
    },
    buttonIconRight: {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(0)
      }
    },
    grow: {
      flexGrow: 1
    },
    loginLabel: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  username: string;

  getUser: () => void;
  onLogout: () => void;
  onMenuClick: () => void;
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

  public componentDidMount() {
    this.props.getUser();
  }

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
      props: { classes, onMenuClick, username },
      state: { anchorEl, isRegistering }
    } = this;

    const open = Boolean(anchorEl);
    const isAuthenticated = Boolean(username);
    const searchValue =
      QueryUtil.parseQueryString(window.location.search).q || "";

    return (
      <div className={classes.root}>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            {isAuthenticated && (
              <IconButton
                id="header-button-menu"
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={onMenuClick}
              >
                <Menu />
              </IconButton>
            )}
            <SearchBar initialValue={searchValue} onSearch={handleSearch} />
            <div className={classes.grow} />
            {isAuthenticated && (
              <Button
                id="header-button-logout"
                variant="outlined"
                color="inherit"
                className={classes.button}
                onClick={handleLogout}
              >
                <span className={classes.loginLabel}>Log out</span>
                <ExitToApp className={classes.buttonIconRight} />
              </Button>
            )}
            {!isAuthenticated && (
              <React.Fragment>
                <Button
                  id="header-button-login"
                  variant="outlined"
                  aria-describedby={"header-popover-login"}
                  color="inherit"
                  className={classes.button}
                  onClick={handlePopoverOpen}
                >
                  <AccountCircle className={classes.buttonIconLeft} />
                  <span className={classes.loginLabel}>Log in</span>
                </Button>
                <Popover
                  id={"header-popover-login"}
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
