import { Category } from "types";

interface Gif {
  _id?: string;
  categories?: Category[];
  giphy_id: string;
  title: string;
  original_url: string;
  fixed_url: string;
  height: string;
}

interface GifPagination {
  count: number;
  offset: number;
  total_count: number;
}

interface GifResponse {
  id: string;
  images: {
    fixed_width: {
      height: string;
      webp: string
    }
    original: {
      url: string;
    }
  };
  title: string;
}

export { Gif, GifPagination, GifResponse };
