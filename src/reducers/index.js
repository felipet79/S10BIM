import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import proyectsReducer from './proyects.reducer';

export default combineReducers({
    auth: authReducer,
	proyects: proyectsReducer
})