import {
  NAVIGATE_DOWN,
  NAVIGATE_LEFT,
  NAVIGATE_RIGHT,
  NAVIGATE_UP,
  REGISTER_ITEMS,
  SELECT_ITEM,
  UNREGISTER_ITEMS,
  UNSELECT_ITEM
} from '../types';

import get from 'lodash/get';

export const navigateDown = () => {
  return dispatch => {
    dispatch({
      type: NAVIGATE_DOWN
    });
  };
};

export const navigateUp = () => {
  return dispatch => {
    dispatch({
      type: NAVIGATE_UP
    });
  };
};

export const navigateLeft = () => {
  return dispatch => {
    dispatch({
      type: NAVIGATE_LEFT
    });
  };
};

export const navigateRight = () => {
  return dispatch => {
    dispatch({
      type: NAVIGATE_RIGHT
    });
  };
};

export const registerItems = ({ items }) => {
  return dispatch => {
    dispatch({
      type: REGISTER_ITEMS,
      data: {
        items
      }
    });
  };
};

export const unregisterItems = ({ items }) => {
  return dispatch => {
    dispatch({
      type: UNREGISTER_ITEMS,
      data: {
        items
      }
    });
  };
};

export const selectItem = () => {
  return (dispatch, getState) => {
    const {
      navigation: { cursor, items }
    } = getState();
    const item = get(items, cursor);
    if (item.nested) return dispatch(navigateRight());

    dispatch({
      type: SELECT_ITEM,
      data: {
        item
      }
    });
  };
};

export const unselectItem = () => {
  return (dispatch, getState) => {
    const {
      navigation: { selectedItem }
    } = getState();
    if (!selectedItem) return dispatch(navigateLeft());

    dispatch({
      type: UNSELECT_ITEM
    });
  };
};
