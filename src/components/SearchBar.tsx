import React, { ChangeEvent, KeyboardEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Paper, IconButton, InputBase, WithStyles } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Clear, Search } from "@material-ui/icons";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      flex: 1,
      fontSize: 20,
      marginLeft: 8
    },
    iconButton: {
      padding: 10
    }
  });

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  initialValue: string;

  onSearch: (query: string) => void;
}

interface State {
  query: string;
}

class SearchBarWithStyles extends React.Component<Props, State> {
  state = {
    query: this.props.initialValue
  };
  
  render() {
    const {
      handleClear,
      handleQueryUpdate,
      handleSearch,
      handleSearchOnKeypress,
      props: { classes },
      state: { query }
    } = this;

    return (
      <Paper className={classes.root}>
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSearch}
        >
          <Search />
        </IconButton>
        <InputBase
          value={query}
          className={classes.input}
          placeholder="Search GIPHY for fresh GIFs"
          inputProps={{ "aria-label": "search giphy" }}
          onChange={handleQueryUpdate}
          onKeyPress={handleSearchOnKeypress}
        />
        {query !== "" && (
          <IconButton
            className={classes.iconButton}
            aria-label="cancel"
            onClick={handleClear}
          >
            <Clear />
          </IconButton>
        )}
      </Paper>
    );
  }

  private handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({ query: event.target.value });

  private handleSearchOnKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  };

  private handleClear = () => {
    this.setState({ query: "" }, this.handleSearch);
  };

  private handleSearch = () => {
    if (this.props.location.pathname === "/") {
      this.props.onSearch(this.state.query);
    }

    this.props.history.push({
      pathname: "/",
      search: this.state.query ? `?q=${this.state.query}` : ""
    });
  };
}

const SearchBar = withStyles(styles)(withRouter(SearchBarWithStyles));

export { SearchBar };
