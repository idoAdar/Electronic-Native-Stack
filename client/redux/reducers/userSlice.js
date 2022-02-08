import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: null,
  singleProduct: null,
  userCart: null,
  orders: null,
  message: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
      state.isLoading = false;
    },
    setUserCart: (state, action) => {
      state.userCart = action.payload;
    },
    setAddToCart: (state, action) => {
      let updateExistProduct = state.userCart.cart.find(
        item => item.productId === action.payload.productId,
      );
      const existIndexProduct = state.userCart.cart.findIndex(
        item => item.productId === action.payload.productId,
      );
      if (updateExistProduct) {
        updateExistProduct.quantity =
          updateExistProduct.quantity + action.payload.quantity;
        updateExistProduct.price =
          updateExistProduct.price + action.payload.price;
        state.userCart.sum = state.userCart.sum + action.payload.price;
        state.userCart.cart[existIndexProduct] = updateExistProduct;
      } else {
        state.userCart.cart.push(action.payload);
        state.userCart.sum = state.userCart.sum + action.payload.price;
      }
    },
    setRemoveFromCart: (state, action) => {
      state.userCart = action.payload;
      state.isLoading = false;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    setNewOrder: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    resetUserCart: state => {
      state.userCart.cart = [];
      state.userCart.sum = 0;
    },
    setSpinner: state => {
      state.isLoading = true;
    },
  },
});

export const {
  setAllProducts,
  setSingleProduct,
  setUserCart,
  setAddToCart,
  setRemoveFromCart,
  setOrders,
  setNewOrder,
  resetUserCart,
  setSpinner,
} = userSlice.actions;

export default userSlice.reducer;
