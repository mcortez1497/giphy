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
import { GridUtil } from "services";
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
    column: {
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    brick: {
      margin: theme.spacing(0.5),
      width: "400px",
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    }
  });

interface Props extends WithWidthProps, WithStyles<typeof styles> {
  readonly apiRequest: ApiRequest;
  readonly gifs: Gif[];
  readonly isAuthenticated: boolean;
  readonly showEmptyMessage?: boolean;
}

const ContentWithStyles: React.FC<Props> = ({
  apiRequest: { isError },
  isAuthenticated,
  classes,
  gifs,
  width = "lg",
  showEmptyMessage = true
}) => {
  // Calculate the number of columns to display
  // So we ensure the Grid is responsive
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

  const hasGifs = gifs.length > 0;
  const numOfColumns = calculateColumns();
  const displayData = GridUtil.buildGifDisplay(
    gifs,
    numOfColumns,
    isAuthenticated
  );

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CssBaseline />
      {!isError && hasGifs && (
        <div
          className={classes.masonry}
          style={{
            height: displayData.height
          }}
        >
          {Object.keys(displayData.columns).map((_, index: number) => (
            <div key={index} className={classes.column}>
              {displayData.columns[index].map((gif: Gif) => (
                <div key={gif.giphy_id} className={classes.brick}>
                  <GifCardContainer gif={gif} />
                </div>
              ))}
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

// Export an unwrapped version for testing
const ContentForTesting = withStyles(styles)(ContentWithStyles);

export { Content, ContentForTesting };
