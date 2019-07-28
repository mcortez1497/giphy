import React, { ChangeEvent, KeyboardEvent } from "react";

import { Paper, IconButton, InputBase, WithStyles } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      marginLeft: 8,
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  });

interface Props extends WithStyles<typeof styles> {
  onSearch: (query: string) => void;
}

interface State {
  query: string;
}

class SearchBarWithStyles extends React.Component<Props, State> {
  state = {
    query: ""
  };

  render() {
    const {
      handleQueryUpdate,
      handleSearch,
      handleSearchOnKeypress,
      props: { classes }
    } = this;

    return (
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search GIPHY"
          inputProps={{ "aria-label": "search giphy" }}
          onChange={handleQueryUpdate}
          onKeyPress={handleSearchOnKeypress}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSearch}
        >
          <Search />
        </IconButton>
      </Paper>
    );
  }

  private handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({ query: event.target.value });

  private handleSearchOnKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  private handleSearch = () => {
    this.props.onSearch(this.state.query);
  };
}

const SearchBar = withStyles(styles)(SearchBarWithStyles);

export { SearchBar };
