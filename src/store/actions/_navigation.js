import {
  NAVIGATE_DOWN,
  NAVIGATE_LEFT,
  NAVIGATE_RIGHT,
  NAVIGATE_UP,
  REGISTER_ITEMS,
  UNREGISTER_ITEMS
} from '../types';

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

export const registerItems = ({ items, page }) => {
  return dispatch => {
    dispatch({
      type: REGISTER_ITEMS,
      data: {
        items,
        page
      }
    });
  };
};

export const unregisterItems = ({ page }) => {
  return dispatch => {
    dispatch({
      type: UNREGISTER_ITEMS,
      data: {
        page
      }
    });
  };
};
