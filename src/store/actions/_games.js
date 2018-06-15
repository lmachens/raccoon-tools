import { SET_GAME_IS_RUNNING, SET_GAME_IS_TERMINATED } from '../types';
import { addGameInfoUpdatedListener, addGameLaunchedListener } from '../../api/games';

export const trackGameInfo = () => {
  return (dispatch, getState) => {
    const gameLaunchedListener = ({ title, id }) => {
      const {
        settings: { stopMiningOnGameLaunch }
      } = getState();

      if (!stopMiningOnGameLaunch) return;

      dispatch({
        type: SET_GAME_IS_RUNNING,
        data: { title, id }
      });
    };
    const gameInfoUpdatedListener = ({ runningChanged, gameInfo }) => {
      const {
        settings: { stopMiningOnGameLaunch }
      } = getState();

      if (!stopMiningOnGameLaunch) return;

      if (!runningChanged) return;
      const data = { title: gameInfo.title, id: gameInfo.id };
      if (!gameInfo.isRunning) {
        dispatch({
          type: SET_GAME_IS_TERMINATED,
          data
        });
      }
    };

    addGameLaunchedListener(gameLaunchedListener);
    addGameInfoUpdatedListener(gameInfoUpdatedListener);
  };
};
