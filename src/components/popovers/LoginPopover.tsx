import React, { ChangeEvent, KeyboardEvent } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

import { UIErrors, ApiRequest } from "types";

const styles = (theme: Theme) =>
  createStyles({
    apiError: {
      textAlign: "center"
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    cardActions: {
      flexDirection: "column",
      width: "100%"
    },
    cardTitle: {
      paddingBottom: theme.spacing(0)
    },
    signup: {
      margin: theme.spacing(0)
    },
    submit: {
      margin: theme.spacing(0, 0, 2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly apiRequest: ApiRequest;
  readonly didRegister: boolean;

  readonly onClose: () => void;
  readonly onSignUp: () => void;
  readonly onSubmit: (username: string, password: string) => void;
}

interface State {
  errors: UIErrors;
  password: string;
  username: string;
}

class LoginPopoverWithStyles extends React.Component<Props, State> {
  state = {
    errors: {} as UIErrors,
    password: "",
    username: ""
  };

  public componentWillUnmount() {
    this.props.onClose();
  }

  render() {
    const {
      handlePasswordChange,
      handleSubmit,
      handleSubmitOnEnter,
      handleUsernameChange,
      props: { apiRequest, classes, didRegister = false, onSignUp },
      state: { errors, password, username }
    } = this;

    const { isError, isLoading, message = "" } = apiRequest;

    return (
      <Card className={classes.card}>
        {didRegister && (
          <CardHeader
            title="Registration Success!"
            titleTypographyProps={{ color: "primary" }}
            className={classes.cardTitle}
          />
        )}
        <CardContent>
          <FormControl
            required
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors["username"]}
          >
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              autoFocus
              id="popover-login-username"
              labelWidth={85}
              value={username}
              onChange={handleUsernameChange}
              onKeyPress={handleSubmitOnEnter}
            />
            {!!errors["username"] && (
              <FormHelperText>{errors["username"]}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            required
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors["password"]}
          >
            <InputLabel htmlFor="password-confirm">Password</InputLabel>
            <OutlinedInput
              id="popover-login-password"
              type="password"
              labelWidth={85}
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleSubmitOnEnter}
            />
            {!!errors["password"] && (
              <FormHelperText>{errors["password"]}</FormHelperText>
            )}
          </FormControl>
          {isError && (
            <Typography
              variant="body1"
              color="error"
              className={classes.apiError}
            >
              {message}
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            type="button"
            id="popover-login-submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
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
    const errors: UIErrors = {};

    if (username.trim() === "") {
      errors["username"] = "No username provided.";
    }
    if (password.trim() === "") {
      errors["password"] = "No password provided.";
    }

    this.setState({ errors }, () => {
      if (Object.keys(errors).length === 0)
        this.props.onSubmit(username, password);
    });
  };

  private handleSubmitOnEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
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
