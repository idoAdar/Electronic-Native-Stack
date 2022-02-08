import {
  setAllProducts,
  setSingleProduct,
  setUserCart,
  setAddToCart,
  setRemoveFromCart,
  setOrders,
  setNewOrder,
} from '../reducers/userSlice';
import {
  fetchProductsAsync,
  fetchSingleProductAsync,
  fetchUserCartAsync,
  addToCartAsync,
  removeFromCartAsync,
  fetchOrdersAsync,
  createOrderAsync,
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

// Fetch User Orders
export const fetchOrders = () => async dispatch => {
  const response = await fetchOrdersAsync();
  dispatch(setOrders(response));
};

// Create New Order
export const createOrder = order => async dispatch => {
  const response = await createOrderAsync(order);
  dispatch(setNewOrder(response.message));
};
