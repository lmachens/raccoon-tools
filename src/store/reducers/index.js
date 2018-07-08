import { combineReducers } from 'redux';
import { gameInfo } from './_gameInfo';
import { navigation } from './_navigation';
import { omnibox } from './_omnibox';
import { utilities } from './_utilities';

const reducers = combineReducers({
  gameInfo,
  navigation,
  omnibox,
  utilities
});

export default reducers;
