import { SET_GAME_IS_RUNNING, SET_GAME_IS_TERMINATED } from '../types';

export const gameInfo = (state = {}, { type, data }) => {
  switch (type) {
    case SET_GAME_IS_RUNNING:
      return { ...data.gameInfo };
    case SET_GAME_IS_TERMINATED:
      return {};
    default:
      return state;
  }
};
