import { persistor, store } from '../../store';

import { AppLayout } from '../../ui/layouts';
import { HomePage } from '../../ui/pages';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { dark } from '../../ui/themes';
import { initialize as initializeAnalytics } from '../../api/analytics';

initializeAnalytics();

const App = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={dark}>
        <AppLayout>
          <HomePage />
        </AppLayout>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
