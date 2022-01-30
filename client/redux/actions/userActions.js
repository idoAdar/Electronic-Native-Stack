import {
  setAllProducts,
  setSingleProduct,
  setUserCart,
  setAddToCart,
  setRemoveFromCart,
} from '../reducers/userSlice';
import {
  fetchProductsAsync,
  fetchSingleProductAsync,
  fetchUserCartAsync,
  addToCartAsync,
  removeFromCartAsync,
} from '../requests/userRequests';

// Fetch All Products
export const fetchProducts = () => async dispatch => {
  const response = await fetchProductsAsync();
  dispatch(setAllProducts(response));
};

// Fetch Single Product
export const fetchSingleProduct = productId => async dispatch => {
  const response = await fetchSingleProductAsync(productId);
  dispatch(setSingleProduct(response));
};

// Fetch User Cart
export const fetchUserCart = () => async dispatch => {
  const response = await fetchUserCartAsync();
  dispatch(setUserCart(response));
};

// Add Product To Cart
export const addToCart = (productId, quantity, price) => async dispatch => {
  await addToCartAsync(productId, quantity);
  const updateCart = {productId, quantity, price};
  dispatch(setAddToCart(updateCart));
};

// Remove Product From Cart
export const removeFromCart = productId => async dispatch => {
  const response = await removeFromCartAsync(productId);
  dispatch(setRemoveFromCart(response));
};
