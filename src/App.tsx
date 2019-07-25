import React from 'react';
import { Provider } from 'react-redux';

import { ContentContainer, Header } from 'components';
import { store } from 'reducers';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <ContentContainer />
      </div>
    </Provider>
  );
};

export default App;
