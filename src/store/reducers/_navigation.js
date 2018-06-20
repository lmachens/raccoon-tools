import { NAVIGATE_DOWN, NAVIGATE_LEFT, NAVIGATE_RIGHT, NAVIGATE_UP } from '../types';

export const navigation = (
  state = {
    cursor: 0,
    items: [0, 1, 2]
  },
  { type }
) => {
  switch (type) {
    case NAVIGATE_DOWN:
      if (state.cursor < state.items.length - 1) {
        return { ...state, cursor: state.cursor + 1 };
      }
      break;
    case NAVIGATE_UP:
      if (state.cursor > 0) {
        return { ...state, cursor: state.cursor - 1 };
      }
      break;
    case NAVIGATE_LEFT:
      break;
    case NAVIGATE_RIGHT:
      break;
  }
  return state;
};
