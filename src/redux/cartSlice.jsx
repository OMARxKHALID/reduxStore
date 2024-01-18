import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { generalCart: [], userCart: [] };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    add: (state, action) => {
      const { id, title, price, userId } = action.payload;
      const cartToUpdate = userId ? 'userCart' : 'generalCart';
      const existingItem = state[cartToUpdate].find(item => item.id === id);

      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        state[cartToUpdate] = state[cartToUpdate].map(item => (item.id === id ? updatedItem : item));
      } else {
        state[cartToUpdate].push({ id, title, price, quantity: 1 });
      }

      saveCartToLocalStorage(state);
    },
    remove: (state, action) => {
      const { itemId, userId } = action.payload;
      const cartToUpdate = userId ? 'userCart' : 'generalCart';
      state[cartToUpdate] = state[cartToUpdate].filter(item => item.id !== itemId);
      saveCartToLocalStorage(state);
    },
    removeAll: (state, action) => {
      const { userId } = action.payload;
      const cartToUpdate = userId ? 'userCart' : 'generalCart';
      state[cartToUpdate] = [];
      saveCartToLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const { itemId, newQuantity, userId } = action.payload;
      const cartToUpdate = userId ? 'userCart' : 'generalCart';
      state[cartToUpdate] = state[cartToUpdate].map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      saveCartToLocalStorage(state);
    },
    setUserCart: (state, action) => {
      const { userId, cartData } = action.payload;
      state.userCart = cartData;
      saveCartToLocalStorage(state);
    },
    clearUserCart: (state) => {
      state.userCart = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const { add, remove, removeAll, updateQuantity, setUserCart, clearUserCart } = cartSlice.actions;
export default cartSlice.reducer;
