import { Category } from "types";

interface Gif {
  _id?: string;
  categories?: Category[];
  title: string;
  url: string;
}

interface GifPagination {
  count: number;
  offset: number;
  total_count: number;
}

interface GifResponse {
  images: {
    original: {
      url: string;
    };
  };
  title: string;
}

export { Gif, GifPagination, GifResponse };
