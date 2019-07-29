import React, { ChangeEvent } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    cardActions: {
      flexDirection: "column"
    },
    signup: {
      margin: theme.spacing(0)
    },
    submit: {
      margin: theme.spacing(0, 0, 2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly onSignUp: () => void;
  readonly onSubmit: (username: string, password: string) => void;
}

interface State {
  password: string;
  username: string;
}

class LoginPopoverWithStyles extends React.Component<Props, State> {
  state = {
    password: "",
    username: ""
  };

  render() {
    const {
      handlePasswordChange,
      handleSubmit,
      handleUsernameChange,
      props: { classes, onSignUp },
      state: { password, username }
    } = this;

    return (
      <Card className={classes.card}>
        <CardContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <Link
            href="#"
            variant="body2"
            className={classes.signup}
            onClick={onSignUp}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </CardActions>
      </Card>
    );
  }

  private handleSubmit = () => {
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  };

  private handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  private handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };
}

const LoginPopover = withStyles(styles)(LoginPopoverWithStyles);

export { LoginPopover };
