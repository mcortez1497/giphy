import { Gif } from "types";

interface GifBuckets {
  [key: number]: Gif[];
}

class GridUtil {
  // Calculate the total height of the container so the masonry effect will
  // fit properly into the calculated columns.
  public calculateContainerHeight = (
    numOfColumns: number,
    gifs: Gif[],
    includeCardFooters: boolean
  ) => {
    const cardFooterHeight = includeCardFooters ? 64 : 0;
    const cardMarginHeight = 8;

    // Total height of each card calulated by:
    // Card footer (64px) + margin (8px) + Gif Height * 2
    // We double height since each Gif is also being doubled in width within the Card
    const height = gifs.reduce((height: number, gif: Gif) => {
      return (
        height +
        cardFooterHeight +
        cardMarginHeight +
        parseInt(gif.height, 10) * 2
      );
    }, 0);

    // Divide the total height by the number of columns
    // Then add a buffer to get container height
    return height / numOfColumns + height / (1 + gifs.length) + "px";
  };

  // Divide Gifs evenly into buckets, so that whenever they are rendered,
  // they will not move as more gifs are loaded. 
  // Each column of the grid corresponds to one of these buckets.
  public buildGifBuckets = (gifs: Gif[], numOfColumns: number) => {
    const buckets = this.buildEmptyBuckets(numOfColumns);

    return gifs.reduce((acc: GifBuckets, gif: Gif, index: number) => {
      const mod = index % numOfColumns;
      acc[mod].push(gif);
      return acc;
    }, buckets);
  };

  private buildEmptyBuckets = (numOfColumns: number): GifBuckets =>
    Array(numOfColumns)
      .fill(0)
      .reduce((buckets: GifBuckets, _, index: number) => {
        buckets[index] = [];
        return buckets;
      }, {});
}

const GridUtilSingleton = new GridUtil();
export { GridUtilSingleton as GridUtil };
