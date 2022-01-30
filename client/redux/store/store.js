import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

// Reducers:
import userSlice from '../reducers/userSlice';
import accountSlice from '../reducers/accountSlice';

// Flipper - Debuuger
const createDebugger = require('redux-flipper').default;

const rootReducer = combineReducers({
  accountSlice,
  userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createDebugger()),
});

export default store;
