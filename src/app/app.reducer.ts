import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import hackathonReducer from '@/app/hackathon/hackathon.reducer';

export default combineReducers({
    form: formReducer,
    hackathonReducer,
});