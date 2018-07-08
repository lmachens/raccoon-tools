import { combineReducers } from 'redux';
import { games } from './_games';
import { navigation } from './_navigation';
import { omnibox } from './_omnibox';
import { utilities } from './_utilities';

const reducers = combineReducers({
  games,
  navigation,
  omnibox,
  utilities
});

export default reducers;
