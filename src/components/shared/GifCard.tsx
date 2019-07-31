import React from "react";

import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  IconButton,
  Modal,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Favorite } from "@material-ui/icons";

import { CategorySelector } from "components";
import { Category, Gif } from "types";

const styles = (theme: Theme) =>
  createStyles({
    favorite: {
      alignSelf: "flex-start"
    },
    grow: {
      flexGrow: 1
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly categories: Category[];
  readonly gif: Gif;
  readonly isAuthenticated: boolean;

  readonly onAdd: (gif: Gif) => void;
  readonly onCategoryChange: (gifId: string, categoryIds: string[]) => void;
  readonly onDelete: (gifId: string) => void;
}

interface State {
  readonly isBlownUp: boolean;
}

class GifCardWithStyles extends React.Component<Props, State> {
  state = {
    isBlownUp: false
  };

  render() {
    const {
      props: { categories, classes, gif, isAuthenticated, onCategoryChange },
      state: { isBlownUp },
      addGif,
      blowUpImage,
      deleteGif
    } = this;

    const isSaved = Boolean(gif._id);

    return (
      <Card raised>
        <CardActionArea onClick={blowUpImage}>
          <CardMedia
            component="img"
            alt={gif.title}
            image={gif.fixed_url}
            title={gif.title}
          />
        </CardActionArea>
        {isAuthenticated && (
          <CardActions disableSpacing>
            {isSaved && (
              <React.Fragment>
                <CategorySelector
                  gif={gif}
                  categories={categories}
                  onCategorySelect={onCategoryChange}
                />
                <IconButton
                  aria-label="remove"
                  className={classes.favorite}
                  onClick={deleteGif}
                >
                  <Favorite color="secondary" />
                </IconButton>
              </React.Fragment>
            )}
            {!isSaved && (
              <React.Fragment>
                <div className={classes.grow} />
                <IconButton
                  aria-label="add"
                  className={classes.favorite}
                  onClick={addGif}
                >
                  <Favorite />
                </IconButton>
              </React.Fragment>
            )}
          </CardActions>
        )}
        <Modal
          open={isBlownUp}
          onClose={this.shrinkImage}
          className={classes.modal}
        >
          <img src={gif.original_url} title={gif.title} alt={gif.title} />
        </Modal>
      </Card>
    );
  }

  private addGif = () => this.props.onAdd(this.props.gif);

  private deleteGif = () => {
    if (!this.props.gif._id) {
      return;
    }
    this.props.onDelete(this.props.gif._id);
  };

  private blowUpImage = () => this.setState({ isBlownUp: true });

  private shrinkImage = () => this.setState({ isBlownUp: false });
}

const GifCard = withStyles(styles)(GifCardWithStyles);

export { GifCard };
