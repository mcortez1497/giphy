interface Gif {
  url: string;
  title: string;
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
