import React from 'react';

import { Gif } from 'types';

interface Props {
  gif: Gif;
}

const GifCard: React.FC<Props> = ({ gif }) => (
  <div>
    <img src={gif.url} alt={gif.title} />
  </div>
);

export { GifCard };
