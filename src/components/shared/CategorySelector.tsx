import React, { ChangeEvent } from "react";

import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

import { Category, Gif } from "types";

const styles = (theme: Theme) =>
  createStyles({
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    grow: {
      flexGrow: 1
    },
    label: {
      top: "-7px"
    },
    select: {
      flexGrow: 1,
      "&::before": {
        borderWidth: 0
      }
    }
  });

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
};

interface Props extends WithStyles<typeof styles> {
  readonly categories: Category[];
  readonly gif: Gif;

  readonly onCategorySelect: (gifId: string, categories: string[]) => void;
}

const CategorySelectorWithStyles: React.FC<Props> = ({
  categories,
  classes,
  gif,
  onCategorySelect
}) => (
  <FormControl className={classes.grow}>
    {!gif.categories ||
      (gif.categories.length <= 0 && (
        <InputLabel htmlFor="select-multiple-chip" className={classes.label}>
          Add Categories
        </InputLabel>
      ))}
    <Select
      multiple
      value={getSelectedCategories(gif)}
      onChange={handleCategorySelect(gif, onCategorySelect)}
      className={classes.select}
      input={<Input id="select-multiple-chip" />}
      renderValue={selected => (
        <div className={classes.chips}>
          {(selected as string[]).map(categoryId => (
            <Chip
              key={categoryId}
              label={getCategoryNameById(categoryId, gif.categories)}
              className={classes.chip}
            />
          ))}
        </div>
      )}
      MenuProps={MenuProps}
      IconComponent={() => null}
    >
      >
      <MenuItem value="" disabled>
        Add Categories
      </MenuItem>
      {categories.map((category, index) => (
        <MenuItem
          key={index}
          value={category._id}
        >
          {category.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const getSelectedCategories = (gif: Gif) =>
  gif.categories ? gif.categories.map(cat => cat._id) : [];

const getCategoryNameById = (
  categoryId: string,
  categories: Category[] = []
) => {
  const category = categories.find(category => category._id === categoryId);
  return category ? category.name : "";
};

const handleCategorySelect = (gif: Gif, onCategorySelect: Function) => (
  event: ChangeEvent<{ name?: string | undefined; value: any }>
) => {
  if (!gif._id) {
    return;
  }
  onCategorySelect(gif._id, event.target.value);
};

const CategorySelector = withStyles(styles)(CategorySelectorWithStyles);

export { CategorySelector };
