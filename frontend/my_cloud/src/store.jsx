import { createStore, combineReducers } from 'redux';
import reducer from './reducers/reducerUsers';

const rootReducer = combineReducers({
    serviceUsers: reducer
});

const store = createStore(rootReducer);

export default store;