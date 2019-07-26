import React from 'react';
import { Provider } from 'react-redux';

import { ContentContainer, HeaderContainer } from 'components';
import { store } from 'reducers';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <HeaderContainer />
        <ContentContainer />
      </div>
    </Provider>
  );
};

export default App;
