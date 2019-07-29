import React from "react";

import {
  Container,
  CssBaseline,
  GridList,
  GridListTile,
  WithStyles
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

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

interface Props extends WithStyles<typeof styles> {
  gifs: Gif[];
}

const calculateColumns = (gifs: Gif[]) => {
  if (gifs.length <= 2) {
    return gifs.length;
  }
  return 3;
};

const ContentWithStyles: React.FC<Props> = ({ classes, gifs }) => (
  <Container maxWidth="lg">
    <CssBaseline />
    <div className={classes.root}>
      <GridList cols={calculateColumns(gifs)}>
        {gifs.map((gif, index) => (
          <GridListTile key={index} cols={1} className={classes.gridListTile}>
            <GifCardContainer gif={gif} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  </Container>
);

const Content = withStyles(styles)(ContentWithStyles);

export { Content };
