import { Category } from "types";

interface Gif {
  _id?: string;
  categories?: Category[];
  giphy_id: string;
  title: string;
  url: string;
}

interface GifPagination {
  count: number;
  offset: number;
  total_count: number;
}

interface GifResponse {
  id: string,
  images: {
    original: {
      url: string;
    };
  };
  title: string;
}

export { Gif, GifPagination, GifResponse };
