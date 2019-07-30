import React from "react";

import { MenuItem, MenuList } from "@material-ui/core";

interface Props {
  readonly hasCategories: boolean;

  readonly onClose: () => void;
  readonly onAddClick: () => void;
  readonly onRemoveClick: () => void;
}

const EditCategoriesPopover: React.FC<Props> = ({
  hasCategories,
  onClose,
  onAddClick,
  onRemoveClick
}) => {
  const handleAddClick = () => {
    onAddClick();
  };

  const handleRemoveClick = () => {
    onRemoveClick();
    onClose();
  };

  return (
    <MenuList>
      <MenuItem onClick={handleAddClick}>Add</MenuItem>
      <MenuItem onClick={handleRemoveClick} disabled={!hasCategories}>
        Remove...
      </MenuItem>
    </MenuList>
  );
};

export { EditCategoriesPopover };
