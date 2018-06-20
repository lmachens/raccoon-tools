import { applyMiddleware, createStore } from 'redux';
import {
  fetchOverwolfUser,
  fetchVersion,
  navigateDown,
  navigateLeft,
  navigateRight,
  navigateUp,
  trackGameInfo
} from './actions';
import { persistReducer, persistStore } from 'redux-persist';

import { RAVEN_URL } from '../api/environment';
import createRavenMiddleware from 'raven-for-redux';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['games', 'navigation']
};

const persistedReducer = persistReducer(persistConfig, reducers);

let createStoreWithMiddleware;
if (RAVEN_URL) {
  Raven.config(RAVEN_URL).install();
  createStoreWithMiddleware = applyMiddleware(thunk, createRavenMiddleware(Raven))(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store, null, () => {
  store.dispatch(fetchOverwolfUser());
  store.dispatch(fetchVersion());
  store.dispatch(trackGameInfo());
  document.addEventListener('keydown', e => {
    if (e.keyCode === 38) {
      store.dispatch(navigateUp());
    } else if (e.keyCode === 40) {
      store.dispatch(navigateDown());
    } else if (e.keyCode === 39) {
      store.dispatch(navigateRight());
    } else if (e.keyCode === 37) {
      store.dispatch(navigateLeft());
    }
  });
});
