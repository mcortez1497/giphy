import React, { ChangeEvent } from "react";

interface Props {
  username: string;

  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  onRegister: (username: string, password: string) => void;
}

interface State {
  username: string;
  password: string;
}

class Header extends React.Component<Props, State> {
  state = {
    username: "",
    password: ""
  };

  render() {
    const {
      handleLogin,
      handleLogout,
      handleRegister,
      handlePasswordChange,
      handleUsernameChange,
      state: { password, username }
    } = this;

    return (
      <header>
        {this.props.username === "" && (
          <React.Fragment>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </React.Fragment>
        )}
        {this.props.username !== "" && (
          <React.Fragment>
          <h3>Welcome back, {this.props.username}</h3>
            <button onClick={handleLogout}>Logout</button>
          </React.Fragment>
        )}
      </header>
    );
  }

  private handleLogout = () => {
    this.props.onLogout();
  };

  private handleLogin = () => {
    this.props.onLogin(this.state.username, this.state.password);
  };

  private handleRegister = () => {
    this.props.onRegister(this.state.username, this.state.password);
  };

  private handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  private handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  };
}

export { Header };
