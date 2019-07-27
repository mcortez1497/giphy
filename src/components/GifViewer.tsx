import React from "react";

import { GifCardContainer } from "components";
import { Gif } from "types";

interface Props {
  gifs: Gif[];
}

const GifViewer: React.FC<Props> = ({ gifs }) => (
  <div className="gif-viewer">
    {gifs.map((gif, index) => (
      <GifCardContainer key={index} gif={gif} />
    ))}
  </div>
);

export { GifViewer };
