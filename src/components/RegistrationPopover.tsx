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
  readonly onGoBack: () => void;
  readonly onSubmit: (username: string, password: string) => void;
}

interface State {
  username: string;
  password: string;
}

class LoginPopoverWithStyles extends React.Component<Props, State> {
  state = {
    username: "",
    password: ""
  };

  render() {
    const {
      handlePasswordChange,
      handleSubmit,
      handleUsernameChange,
      props: { classes, onGoBack },
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
            Sign Up
          </Button>
          <Link
            href="#"
            variant="body2"
            className={classes.signup}
            onClick={onGoBack}
          >
            {"Go Back"}
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

const RegistrationPopover = withStyles(styles)(LoginPopoverWithStyles);

export { RegistrationPopover };
