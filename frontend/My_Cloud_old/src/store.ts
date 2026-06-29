import { createStore, combineReducers } from 'redux';
import reducer from './reducers/reducer';

const rootReducer = combineReducers({
  serviceList: reducer
});

const store = createStore(rootReducer);

export default store;