import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  message: null,
  isLoading: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserAuthenticated: state => {
      state.isAuth = true;
      state.isLoading = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    setClearMessage: state => {
      state.message = null;
    },
    setUserLogout: state => {
      state.isAuth = false;
    },
    setAccountSpinner: state => {
      state.isLoading = true;
    },
  },
});

export const {
  setUserAuthenticated,
  setMessage,
  setClearMessage,
  setUserLogout,
  setAccountSpinner,
} = accountSlice.actions;

export default accountSlice.reducer;
