import { combineReducers } from 'redux';
import { games } from './_games';
import { utilities } from './_utilities';

const reducers = combineReducers({
  games,
  utilities
});

export default reducers;
