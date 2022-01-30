import {signInAsync, signUpAsync} from '../requests/accountRequests';
import {
  setUserAuthenticated,
  setMessage,
  setUserLogout,
} from '../reducers/accountSlice';

// Utils
import {saveToStorage, clearStorage} from '../../utils/setAsyncStorage';

// Sign In
export const signIn = state => async dispatch => {
  const response = await signInAsync(state);
  if (response.isError) {
    return dispatch(setMessage(response.error));
  }
  await saveToStorage(response);
  dispatch(setUserAuthenticated());
};

// Sign Up
export const signUp = state => async dispatch => {
  const response = await signUpAsync(state);
  if (response.isError) {
    return dispatch(setMessage(response.error));
  }
  await saveToStorage(response);
  dispatch(setUserAuthenticated());
};

// Logout
export const logout = () => async dispatch => {
  clearStorage();
  dispatch(setUserLogout());
};
