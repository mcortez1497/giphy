import React from "react";

import { Container, CssBaseline, WithStyles } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

import { GifViewer } from "components";
import { Gif } from "types";

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  gifs: Gif[];
}

const ContentWithStyles: React.FC<Props> = ({ gifs }) => (
  <Container maxWidth="lg">
    <CssBaseline />
    <GifViewer gifs={gifs} />
  </Container>
);

const Content = withStyles(styles)(ContentWithStyles);

export { Content };
