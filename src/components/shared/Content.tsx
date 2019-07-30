import React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  CssBaseline,
  WithStyles,
  withWidth,
  Typography
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { isWidthUp, WithWidthProps } from "@material-ui/core/withWidth";

import { GifCardContainer } from "components";
import { ApiRequest, Gif } from "types";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    message: {
      textAlign: "center",
      marginTop: theme.spacing(10)
    },
    loader: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginBottom: "32px"
    },
    progress: {
      margin: theme.spacing(2)
    },
    masonry: {
      display: "flex",
      flexFlow: "column wrap",
      alignContent: "center",
      width: "100%"
    },
    brick: {
      margin: theme.spacing(0.5),
      width: "400px"
    }
  });

interface Props extends WithWidthProps, WithStyles<typeof styles> {
  readonly apiRequest: ApiRequest;
  readonly gifs: Gif[];
  readonly showEmptyMessage?: boolean;
}

const ContentWithStyles: React.FC<Props> = ({
  apiRequest: { isError },
  classes,
  gifs,
  width = "lg",
  showEmptyMessage = true
}) => {
  // Calculate the number of columns to display to ensure Grid is responsive
  const calculateColumns = () => {
    if (gifs.length <= 2) {
      return gifs.length;
    }

    if (isWidthUp("lg", width)) {
      return 3;
    }
    if (isWidthUp("md", width)) {
      return 2;
    }

    return 1;
  };

  // Calculate the total height of the container so the masonry effect will
  // fit properly into the calculated columns.
  const calculateHeight = () => {
    const cols = calculateColumns();

    // Total height of each card calulated by:
    // Card footer (64px) + margin (8px) + Gif Height * 2
    // We multiply since each Gif is also being doubled in width within the Card
    const height = gifs.reduce((height: number, gif: Gif) => {
      return height + 72 + parseInt(gif.height, 10) * 2;
    }, 0);

    // Divide the total height by the number of columns to get height
    return height / cols + height / (gifs.length + 1) + "px";
  };

  const hasGifs = gifs.length > 0;

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CssBaseline />
      {!isError && hasGifs && (
        <div className={classes.masonry} style={{ height: calculateHeight() }}>
          {gifs.map((gif, index) => (
            <div key={index} className={classes.brick}>
              <GifCardContainer gif={gif} />
            </div>
          ))}
        </div>
      )}
      {!isError && !hasGifs && showEmptyMessage && (
        <div className={classes.message}>
          <Typography variant="h4" color="primary">
            There's no GIFs here!
          </Typography>
          <Typography variant="subtitle1">
            <Link to="/" style={{ color: "#757575" }}>
              Go add some
            </Link>
          </Typography>
        </div>
      )}
      {isError && (
        <div className={classes.message}>
          <Typography variant="h4" color="error">
            Uh oh! We couldn't fetch your GIFs!
          </Typography>
          <Typography variant="subtitle1">
            <a href={`/${window.location.search}`} style={{ color: "#757575" }}>
              Try fetching again
            </a>
          </Typography>
        </div>
      )}
    </Container>
  );
};

const Content = withWidth()(withStyles(styles)(ContentWithStyles));

export { Content };
