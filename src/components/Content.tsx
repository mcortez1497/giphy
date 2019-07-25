import React from 'react';

import { GifViewer } from 'components';
import { Gif } from 'types';

interface Props {
  gifs: Gif[];
}

const Content: React.FC<Props> = ({ gifs }) => (
  <div>
    <div>
      <input type='text' placeholder='Search for GIFs' />
    </div>
    <GifViewer gifs={gifs} />
  </div>
);

export { Content };
