import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    add: (state, action) => {
      const { id, title, price } = action.payload;
      const existingItem = state.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ id, title, price, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    remove: (state, action) => {
      const itemId = action.payload;
      const newState = state.filter(item => item.id !== itemId);
      saveCartToLocalStorage(newState);
      return newState;
    },
    updateQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const existingItem = state.find(item => item.id === itemId);

      if (existingItem) {
        existingItem.quantity = newQuantity;
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const { add, remove, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
