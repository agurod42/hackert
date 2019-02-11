import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '@/app/app.reducer';

export default createStore(appReducer, applyMiddleware(thunk));