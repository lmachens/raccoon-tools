import { combineReducers } from 'redux';
import { games } from './_games';
import { navigation } from './_navigation';
import { utilities } from './_utilities';

const reducers = combineReducers({
  games,
  navigation,
  utilities
});

export default reducers;
