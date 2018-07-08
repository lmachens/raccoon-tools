import {
  FOCUS_NAVIGATION,
  NAVIGATE_DOWN,
  NAVIGATE_LEFT,
  NAVIGATE_RIGHT,
  NAVIGATE_UP,
  REGISTER_ITEMS,
  SELECT_ITEM,
  UNFOCUS_NAVIGATION,
  UNREGISTER_ITEMS,
  UNSELECT_ITEM
} from '../types';

import first from 'lodash/first';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import last from 'lodash/last';
import omit from 'lodash/omit';
import toPath from 'lodash/toPath';

export const navigation = (
  state = {
    cursor: 'profile',
    items: {},
    selectedItem: null
  },
  { type, data }
) => {
  switch (type) {
    case FOCUS_NAVIGATION:
      return { ...state, cursor: 'profile', selectedItem: null };
    case UNFOCUS_NAVIGATION:
      return { ...state, cursor: '', selectedItem: null };
    case NAVIGATE_DOWN:
      {
        const path = toPath(state.cursor);
        const prevPath = path.slice(0, path.length - 1);
        const nestedPath = last(path);
        const items = prevPath.length ? get(state.items, prevPath) : state.items;
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
        const items = prevPath.length ? get(state.items, prevPath) : state.items;
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
        const nestedItems = get(state.items, `${state.cursor}.nested`);
        if (nestedItems) {
          const firstChild = first(Object.keys(nestedItems));
          const cursor = `${state.cursor}.nested.${firstChild}`;
          return { ...state, cursor };
        }
      }
      break;
    case REGISTER_ITEMS: {
      const items = { ...state.items, ...data.items };
      return { ...state, items };
    }
    case UNREGISTER_ITEMS: {
      const items = omit(state.items, ...data.items);
      return { ...state, items };
    }
    case SELECT_ITEM:
      return { ...state, selectedItem: data.item };
    case UNSELECT_ITEM: {
      const newState = omit(state, 'selectedItem');
      return newState;
    }
  }
  return state;
};
