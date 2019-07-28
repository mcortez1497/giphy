import React from "react";

import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  Fab,
  WithStyles,
  Modal
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Add, Remove } from "@material-ui/icons";

import { Gif } from "types";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      height: "400px"
    },
    cardActionArea: {
      height: "300px"
    },
    cardMedia: {
      height: "100%"
    },
    fab: {
      // bottom: 0,
      margin: theme.spacing(2)
      // position: "absolute",
      // right: 0
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly gif: Gif;
  readonly isSaved: boolean;

  readonly onAdd: (gif: Gif) => void;
  readonly onDelete: (gif: Gif) => void;
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
      props: { classes, gif, isSaved },
      state: { isBlownUp },
      addGif,
      deleteGif
    } = this;

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardActionArea
            className={classes.cardActionArea}
            onClick={this.blowUpImage}
          >
            <CardMedia
              component="img"
              alt={gif.title}
              image={gif.url}
              title={gif.title}
              className={classes.cardMedia}
            />
          </CardActionArea>
          <CardActions>
            {isSaved && (
              <Fab
                color="secondary"
                aria-label="remove"
                className={classes.fab}
                onClick={deleteGif}
              >
                <Remove />
              </Fab>
            )}
            {!isSaved && (
              <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={addGif}
              >
                <Add />
              </Fab>
            )}
          </CardActions>
        </Card>
        <Modal
          open={this.state.isBlownUp}
          onClose={this.shrinkImage}
          className={classes.modal}
        >
          <img src={gif.url} title={gif.title} alt={gif.title} />
        </Modal>
      </React.Fragment>
    );
  }

  private addGif = () => this.props.onAdd(this.props.gif);
  private deleteGif = () => this.props.onDelete(this.props.gif);
  private blowUpImage = () => this.setState({ isBlownUp: true });
  private shrinkImage = () => this.setState({ isBlownUp: false });
}

const GifCard = withStyles(styles)(GifCardWithStyles);

export { GifCard };
