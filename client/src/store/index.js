import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';

const store = createStore(authReducer, applyMiddleware(thunk));

export default store;
