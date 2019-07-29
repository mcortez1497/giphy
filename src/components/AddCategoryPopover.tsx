import React, { ChangeEvent, KeyboardEvent } from "react";

import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0, 1, 1, 1)
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly onClose: () => void;
  readonly onSubmit: (categoryName: string) => void;
}

interface State {
  categoryName: string;
}

class AddCategoryPopoverWithStyles extends React.Component<Props, State> {
  state = {
    categoryName: ""
  };

  render() {
    const {
      handleCategoryNameChange,
      handleSubmit,
      handleSubmitOnKeypress,
      props: { classes },
      state: { categoryName }
    } = this;

    const isValid = categoryName !== "";

    return (
      <div className={classes.root}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="category"
          label="Category Name"
          name="category"
          value={categoryName}
          onChange={handleCategoryNameChange}
          onKeyPress={handleSubmitOnKeypress}
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!isValid}
                  edge="end"
                  aria-label="add category"
                  onClick={handleSubmit}
                >
                  <Add color={isValid ? "primary" : "disabled"} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }

  private handleSubmit = () => {
    if (this.state.categoryName === "") {
      return;
    }
    this.props.onSubmit(this.state.categoryName);
    this.props.onClose();
  };

  private handleSubmitOnKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };

  private handleCategoryNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ categoryName: event.target.value });
  };
}

const AddCategoryPopover = withStyles(styles)(AddCategoryPopoverWithStyles);

export { AddCategoryPopover };
