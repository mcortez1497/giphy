import React, { ChangeEvent, KeyboardEvent } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
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
    signup: {
      margin: theme.spacing(0)
    },
    submit: {
      margin: theme.spacing(0, 0, 2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly apiRequest: ApiRequest;

  readonly onClose: () => void;
  readonly onGoBack: () => void;
  readonly onSubmit: (username: string, password: string) => void;
}

interface State {
  errors: UIErrors;
  username: string;
  password: string;
  passwordConfirm: string;
}

class LoginPopoverWithStyles extends React.Component<Props, State> {
  state = {
    errors: {} as UIErrors,
    username: "",
    password: "",
    passwordConfirm: ""
  };

  public componentDidUpdate() {
    // If we successfully registered, go back to the login popover
    if (this.props.apiRequest.isSuccess) {
      this.props.onGoBack()
    }
  }

  public componentWillUnmount() {
    this.props.onClose();
  }

  render() {
    const {
      handlePasswordChange,
      handlePasswordConfirmChange,
      handleSubmit,
      handleSubmitOnEnter,
      handleUsernameChange,
      props: { apiRequest, classes, onGoBack },
      state: { errors, password, passwordConfirm, username }
    } = this;

    const { isError, isLoading, message = "" } = apiRequest;

    return (
      <Card className={classes.card}>
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
              id="username"
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
              id="password"
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
          <FormControl
            required
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors["password-confirm"]}
          >
            <InputLabel htmlFor="password-confirm">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="password-confirm"
              type="password"
              labelWidth={145}
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              onKeyPress={handleSubmitOnEnter}
            />
            {!!errors["password-confirm"] && (
              <FormHelperText>{errors["password-confirm"]}</FormHelperText>
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
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
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
    const { username, password, passwordConfirm } = this.state;
    const errors: UIErrors = {};

    if (username.trim() === "") {
      errors["username"] = "No username provided.";
    }
    if (password.trim() === "") {
      errors["password"] = "No password provided.";
    }
    if (passwordConfirm.trim() === "") {
      errors["password-confirm"] = "Confirm your password.";
    } else if (password !== passwordConfirm) {
      errors["password-confirm"] = "Password does not match.";
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

  private handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      password: event.target.value
    });

  private handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>
  ) =>
    this.setState({
      passwordConfirm: event.target.value
    });

  private handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      username: event.target.value
    });
}

const RegistrationPopover = withStyles(styles)(LoginPopoverWithStyles);

export { RegistrationPopover };
