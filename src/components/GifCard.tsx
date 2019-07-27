import React from "react";

import { Gif } from "types";

interface Props {
  readonly gif: Gif;
  readonly onSelect: (gif: Gif) => void;
}

const GifCard: React.FC<Props> = ({ gif, onSelect }) => (
  <div>
    <img src={gif.url} alt={gif.title} onClick={() => onSelect(gif)} />
  </div>
);

export { GifCard };
