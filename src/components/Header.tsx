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
      padding: theme.spacing(1, 2)
    },
    buttonIconLeft: {
      marginRight: theme.spacing(1)
    },
    buttonIconRight: {
      marginLeft: theme.spacing(1)
    },
    grow: {
      flexGrow: 1
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
    const id = open ? "login-popover" : undefined;
    const isAuthenticated = Boolean(username);
    const searchValue =
      QueryUtil.parseQueryString(window.location.search).q || "";

    return (
      <div className={classes.root}>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
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
            <SearchBar initialValue={searchValue} onSearch={handleSearch} />
            <div className={classes.grow} />
            {isAuthenticated && (
              <Button
                variant="outlined"
                color="inherit"
                className={classes.button}
                onClick={handleLogout}
              >
                Log out
                <ExitToApp className={classes.buttonIconRight} />
              </Button>
            )}
            {!isAuthenticated && (
              <React.Fragment>
                <Button
                  variant="outlined"
                  aria-describedby={id}
                  color="inherit"
                  className={classes.button}
                  onClick={handlePopoverOpen}
                >
                  <AccountCircle className={classes.buttonIconLeft} />
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
                    <RegistrationPopoverContainer
                      onGoBack={togglePopover}
                    />
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
