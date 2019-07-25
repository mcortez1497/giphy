import React from "react";

import { GifCard } from '../components';
import { Gif } from '../types';

interface Props {
  gifs: Gif[];
}

const GifViewer: React.FC<Props> = ({ gifs }) => (
  <div className="gif-viewer">
    {gifs.map((gif, index) => (
      <GifCard key={index} gif={gif} />
    ))}
  </div>
);

export { GifViewer };
