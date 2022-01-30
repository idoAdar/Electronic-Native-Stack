import axios from 'axios';
import {domain} from '../../fixtures/Domain.json';
import {routes} from '../../fixtures/Routes.json';
import {fetchFromStorage} from '../../utils/setAsyncStorage';

export const fetchProductsAsync = async () => {
  try {
    const {data} = await axios.get(domain + routes['all-products']);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchSingleProductAsync = async productId => {
  try {
    const {data} = await axios.get(
      domain + routes['single-product'] + productId,
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchUserCartAsync = async () => {
  try {
    const {token} = await fetchFromStorage();
    const {data} = await axios.get(domain + routes['user-cart'], {
      headers: {Authentication: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const addToCartAsync = async (productId, amount) => {
  try {
    const {token} = await fetchFromStorage();
    const {data} = await axios.post(
      domain + routes['add-to-cart'] + productId + '/' + amount,
      null,
      {headers: {Authentication: `Bearer ${token}`}},
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const removeFromCartAsync = async productId => {
  try {
    const {token} = await fetchFromStorage();
    const {data} = await axios.delete(
      domain + routes['remove-from-cart'] + productId,
      {
        headers: {Authentication: `Bearer ${token}`},
      },
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
