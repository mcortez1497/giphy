import { Gif } from "types";

interface GifColumns {
  [key: number]: Gif[];
}

interface GifDisplay {
  columns: GifColumns;
  height: number;
}

class GridUtil {
  private CARD_FOOTER_HEIGHT = 64;
  private CARD_MARGIN_HEIGHT = 8;

  // Build a GifDisplay object, which contains the calculated height of the container
  // and gifs divided evenly into columns.
  public buildGifDisplay = (
    gifs: Gif[],
    numOfColumns: number,
    includeCardFooters: boolean = false,
    trimExtra: boolean = false
  ): GifDisplay => {
    // Divide all gifs evenly into columns
    const columns = this.buildGifColumns(gifs, numOfColumns);

    // Calculate the total height of each column
    const columnHeights = Object.keys(columns).map((_, index: number) =>
      columns[index].reduce(
        (height: number, gif: Gif) =>
          height + this.calculateCardHeight(gif, includeCardFooters),
        0
      )
    );

    // Determine the "target" height of the container, which is the shortest column
    // if we're trimming, or the tallest column if we're not.
    const targetHeight = trimExtra
      ? Math.min(...columnHeights)
      : Math.max(...columnHeights);

    // Trim gifs from each of the taller columns if needed, so that the total height of any column
    // is less than the "target" height. This way, no column grows too large and disrupts
    // the masonry / infinite scroll effect.
    const columnsToDisplay = trimExtra
      ? columnHeights.map((height: number, index: number) => {
          if (height > targetHeight) {
            let colHeight = 0;

            return columns[index].filter((gif: Gif) => {
              colHeight += this.calculateCardHeight(gif, includeCardFooters);

              if (colHeight < targetHeight) {
                return true;
              }
              return false;
            });
          }

          return columns[index];
        })
      : columns;

    return {
      height: targetHeight,
      columns: columnsToDisplay
    };
  };

  // Total height of each card calulated by:
  // Card footer (64px) + margin (8px) + Gif Height * 2
  // We double height since each Gif is also being doubled in width within the Card
  private calculateCardHeight = (gif: Gif, includeCardFooters = false) => {
    const footerHeight = includeCardFooters ? this.CARD_FOOTER_HEIGHT : 0;
    const marginHeight = this.CARD_MARGIN_HEIGHT;

    return footerHeight + marginHeight + parseInt(gif.height, 10) * 2;
  };

  // Divide Gifs evenly into columns, so that whenever they are rendered,
  // they will not move as more gifs are loaded.
  private buildGifColumns = (gifs: Gif[], numOfColumns: number) => {
    const columns = this.buildEmptyColumns(numOfColumns);

    return gifs.reduce((acc: GifColumns, gif: Gif, index: number) => {
      const mod = index % numOfColumns;
      acc[mod].push(gif);
      return acc;
    }, columns);
  };

  // Initialize empty arrays based on the determined number of columns
  private buildEmptyColumns = (numOfColumns: number): GifColumns =>
    Array(numOfColumns)
      .fill(0)
      .reduce((columns: GifColumns, _, index: number) => {
        columns[index] = [];
        return columns;
      }, {});
}

const GridUtilSingleton = new GridUtil();
export { GridUtilSingleton as GridUtil };
