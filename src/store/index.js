import { applyMiddleware, createStore } from 'redux';
import {
  fetchOverwolfUser,
  fetchVersion,
  focusOmnibox,
  navigateDown,
  navigateLeft,
  navigateRight,
  navigateUp,
  selectItem,
  trackGameInfo,
  unfocusOmnibox,
  unselectItem
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
  blacklist: ['games', 'navigation', 'omnibox']
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
  const ENTER = 13;
  const ESCAPE = 27;
  const UP_ARROW = 38;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const DOWN_ARROW = 40;
  const BACKSPACE = 8;
  const SLASH = 191;
  document.addEventListener('keydown', e => {
    const {
      omnibox: { focus }
    } = store.getState();
    if (focus) {
      if (e.keyCode === ENTER) {
        store.dispatch(unfocusOmnibox());
      } else if (e.keyCode === ESCAPE) {
        store.dispatch(unfocusOmnibox());
      }
      return;
    }

    if (e.keyCode === ENTER) {
      store.dispatch(selectItem());
    } else if (e.keyCode === ESCAPE) {
      store.dispatch(unselectItem());
    } else if (e.keyCode === UP_ARROW) {
      store.dispatch(navigateUp());
    } else if (e.keyCode === DOWN_ARROW) {
      store.dispatch(navigateDown());
    } else if (e.keyCode === RIGHT_ARROW) {
      store.dispatch(navigateRight());
    } else if (e.keyCode === LEFT_ARROW || e.keyCode === BACKSPACE) {
      store.dispatch(navigateLeft());
    } else if (e.keyCode === SLASH) {
      store.dispatch(focusOmnibox());
    }
  });
});
