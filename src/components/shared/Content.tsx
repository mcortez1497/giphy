import React from "react";

import {
  Container,
  CssBaseline,
  WithStyles,
  withWidth
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { isWidthUp, WithWidthProps } from "@material-ui/core/withWidth";

import { GifCardContainer } from "components";
import { Gif } from "types";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
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
  gifs: Gif[];
}

const ContentWithStyles: React.FC<Props> = ({
  classes,
  gifs,
  width = "lg"
}) => {
  // Ensure Grid is responsive
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

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CssBaseline />
      <div className={classes.masonry} style={{ height: calculateHeight() }}>
        {gifs.map((gif, index) => (
          <div key={index} className={classes.brick}>
            <GifCardContainer gif={gif} />
          </div>
        ))}
      </div>
    </Container>
  );
};

const Content = withWidth()(withStyles(styles)(ContentWithStyles));

export { Content };
