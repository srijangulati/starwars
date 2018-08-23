import {combineReducers} from 'redux';
import LoginReducer from './login';
import SearchReducer from './search';

export default combineReducers({
  login:LoginReducer,
  search:SearchReducer
});
