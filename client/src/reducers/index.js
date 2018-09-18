import { combineReducers } from 'redux';

const allReducers = combineReducers({
    auth: {isLogged: true}
});

export default allReducers;