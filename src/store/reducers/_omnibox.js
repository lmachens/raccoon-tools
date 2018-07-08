import { FOCUS_OMNIBOX, UNFOCUS_OMNIBOX } from '../types';

export const omnibox = (
  state = {
    command: '',
    focus: false
  },
  { type }
) => {
  switch (type) {
    case FOCUS_OMNIBOX:
      return { ...state, focus: true };

    case UNFOCUS_OMNIBOX:
      return { ...state, focus: false };
  }
  return state;
};
