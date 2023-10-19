// rootReducer.js
import { combineReducers } from 'redux';
import loginReducer from './slices/userSlice/loginSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  // Add other slices/reducers here
});

export default rootReducer;
