import { SET_GAME_IS_RUNNING, SET_GAME_IS_TERMINATED } from '../types';
import { addGameInfoUpdatedListener, addGameLaunchedListener } from '../../api/games';

export const trackGameInfo = () => {
  return (dispatch, getState) => {
    const gameLaunchedListener = gameInfo => {
      const {
        settings: { stopMiningOnGameLaunch }
      } = getState();

      if (!stopMiningOnGameLaunch) return;

      dispatch({
        type: SET_GAME_IS_RUNNING,
        data: { gameInfo }
      });
    };
    const gameInfoUpdatedListener = ({ runningChanged, gameInfo }) => {
      const {
        settings: { stopMiningOnGameLaunch }
      } = getState();

      if (!stopMiningOnGameLaunch) return;

      if (!runningChanged) return;
      if (!gameInfo.isRunning) {
        dispatch({
          type: SET_GAME_IS_TERMINATED
        });
      }
    };

    addGameLaunchedListener(gameLaunchedListener);
    addGameInfoUpdatedListener(gameInfoUpdatedListener);
  };
};
