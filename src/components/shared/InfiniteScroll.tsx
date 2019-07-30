import React from "react";
import { debounce } from "ts-debounce";

import { CircularProgress, WithStyles } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2)
    },
    root: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginBottom: theme.spacing(8)
    }
  });

interface Props extends WithStyles<typeof styles> {
  loadMore: () => void;
}

class InfiniteScrollWithStyles extends React.Component<Props> {
  private component = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    if (this.component.current) {
      window.addEventListener("scroll", this.debouncedHandleScroll);
    }
  }

  public componentWillUnmount() {
    if (this.component.current) {
      window.removeEventListener("scroll", this.debouncedHandleScroll);
    }
  }

  render() {
    const {
      component,
      props: { classes }
    } = this;

    return (
      <div ref={component} className={classes.root}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }

  private handleScroll = () => {
    if (this.component.current) {
      const componentOffset = this.component.current.offsetTop;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > componentOffset) {
        this.props.loadMore();
      }
    }
  };

  private debouncedHandleScroll = debounce(this.handleScroll, 500);
}

const InfiniteScroll = withStyles(styles)(InfiniteScrollWithStyles);

export { InfiniteScroll };
