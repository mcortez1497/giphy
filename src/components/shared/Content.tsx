import React from "react";

import {
  Container,
  CssBaseline,
  GridList,
  GridListTile,
  WithStyles,
  withWidth
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { isWidthUp, WithWidthProps } from "@material-ui/core/withWidth";

import { GifCardContainer } from "components";
import { Gif } from "types";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      overflow: "hidden"
    },
    gridListTile: {
      height: "initial !important",
      minHeight: "368px",
      overflow: "initial"
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

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <div className={classes.root}>
        <GridList cols={calculateColumns()}>
          {gifs.map((gif, index) => (
            <GridListTile key={index} cols={1} className={classes.gridListTile}>
              <GifCardContainer gif={gif} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Container>
  );
};

const Content = withWidth()(withStyles(styles)(ContentWithStyles));

export { Content };
