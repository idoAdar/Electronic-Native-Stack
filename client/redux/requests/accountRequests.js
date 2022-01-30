import axios from 'axios';
import {domain} from '../../fixtures/Domain.json';
import {routes} from '../../fixtures/Routes.json';

export const signInAsync = async state => {
  try {
    const {data} = await axios.post(domain + routes['sign-in'], state);
    return data;
  } catch (error) {
    const errorResponse = {isError: true, error: error.response.data.message};
    return errorResponse;
  }
};

export const signUpAsync = async state => {
  try {
    const {data} = await axios.post(domain + routes['sign-up'], state);
    return data;
  } catch (error) {
    const errorResponse = {isError: true, error: error.response.data.message};
    return errorResponse;
  }
};
