import { combineReducers } from 'redux';
import authReducer from './authReducer';
import watchaReducer from './watchaReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  watcha: watchaReducer,
  users: usersReducer,
});

export default rootReducer;
