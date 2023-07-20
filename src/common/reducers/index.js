import { combineReducers } from 'redux';

import appState from './appState';
import loginState from '../../pages/Authenticate/reducers/LoginReducer';
import currentUser from './currentUser';
import masterData from './masterData';

const rootReducer = combineReducers({
  appState,
  loginState,
  currentUser,
  masterData
});

export default rootReducer;
