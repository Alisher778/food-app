import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';

const allReducers = combineReducers({
    authReducer: AuthReducer
});

export default allReducers;