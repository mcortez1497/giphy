import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Fab,
  Typography,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

import { Gif } from "types";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      position: "relative"
    },
    cardActions: {
      padding: theme.spacing(0)
    },
    fab: {
      bottom: 0,
      margin: theme.spacing(2),
      position: "absolute",
      right: 0
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly gif: Gif;
  readonly onSelect: (gif: Gif) => void;
}

interface State {
  readonly isHovered: boolean;
}

class GifCardWithStyles extends React.Component<Props, State> {
  state = {
    isHovered: false
  };

  render() {
    const {
      props: { classes, gif, onSelect },
      state: { isHovered },
      resetHover,
      setHover,
      selectGif
    } = this;

    const fabDisplayStyle = {
      display: isHovered ? "flex" : "none"
    };

    return (
      <Card
        className={classes.card}
        onMouseEnter={setHover}
        onMouseLeave={resetHover}
      >
        <CardMedia
          component="img"
          alt={gif.title}
          image={gif.url}
          title={gif.title}
        />
        <CardActions className={classes.cardActions}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            style={fabDisplayStyle}
            onClick={selectGif}
          >
            <Add />
          </Fab>
        </CardActions>
      </Card>
    );
  }

  private selectGif = () => this.props.onSelect(this.props.gif);
  private setHover = () => this.setState({ isHovered: true });
  private resetHover = () => this.setState({ isHovered: false });
}

const GifCard = withStyles(styles)(GifCardWithStyles);

export { GifCard };
