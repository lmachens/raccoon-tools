import { FOCUS_NAVIGATION, FOCUS_OMNIBOX, UNFOCUS_NAVIGATION, UNFOCUS_OMNIBOX } from '../types';

export const focusOmnibox = () => {
  return dispatch => {
    dispatch({
      type: FOCUS_OMNIBOX
    });
    dispatch({
      type: UNFOCUS_NAVIGATION
    });
  };
};

export const unfocusOmnibox = () => {
  return dispatch => {
    dispatch({
      type: UNFOCUS_OMNIBOX
    });
    dispatch({
      type: FOCUS_NAVIGATION
    });
  };
};
