import { NAVIGATE_DOWN, NAVIGATE_LEFT, NAVIGATE_RIGHT, NAVIGATE_UP } from '../types';

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
