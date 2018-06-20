import {
  NAVIGATE_DOWN,
  NAVIGATE_LEFT,
  NAVIGATE_RIGHT,
  NAVIGATE_UP,
  REGISTER_ITEMS,
  UNREGISTER_ITEMS
} from '../types';

import first from 'lodash/first';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import last from 'lodash/last';
import omit from 'lodash/omit';
import toPath from 'lodash/toPath';

/*
pages = {
  general: {
    item1: {},
    item2: {},
    item3: {
      item4: {},
      item5: {}
    }
  },
  other: {}
}
*/

export const navigation = (
  state = {
    cursor: 'general.item1',
    pages: {}
  },
  { type, data }
) => {
  switch (type) {
    case NAVIGATE_DOWN:
      {
        const path = toPath(state.cursor);
        const prevPath = path.slice(0, path.length - 1);
        const nestedPath = last(path);
        const items = get(state.pages, prevPath);
        const keys = Object.keys(items);
        const currentIndex = indexOf(keys, nestedPath);
        const newKey = keys[currentIndex + 1];
        if (newKey) {
          const newPath = [...prevPath, newKey];
          const cursor = newPath.reduce((curr, next) => `${curr}.${next}`);
          return { ...state, cursor };
        }
      }
      break;
    case NAVIGATE_UP:
      {
        const path = toPath(state.cursor);
        const prevPath = path.slice(0, path.length - 1);
        const nestedPath = last(path);
        const items = get(state.pages, prevPath);
        const keys = Object.keys(items);
        const currentIndex = indexOf(keys, nestedPath);
        const newKey = keys[currentIndex - 1];
        if (newKey) {
          const newPath = [...prevPath, newKey];
          const cursor = newPath.reduce((curr, next) => `${curr}.${next}`);
          return { ...state, cursor };
        }
      }
      break;
    case NAVIGATE_LEFT:
      {
        const path = toPath(state.cursor);
        if (path.length > 2) {
          const prevPath = path.slice(0, path.length - 2);
          const cursor = prevPath.reduce((curr, next) => `${curr}.${next}`);
          return { ...state, cursor };
        }
      }
      break;
    case NAVIGATE_RIGHT:
      {
        const nestedItems = get(state.pages, `${state.cursor}.nested`);
        if (nestedItems) {
          const firstChild = first(Object.keys(nestedItems));
          const cursor = `${state.cursor}.nested.${firstChild}`;
          return { ...state, cursor };
        }
      }
      break;
    case REGISTER_ITEMS: {
      const pages = { ...state.pages, [data.page]: data.items };
      return { ...state, pages };
    }
    case UNREGISTER_ITEMS: {
      const pages = omit(state.pages, data.page);
      return { ...state, pages };
    }
  }
  return state;
};
