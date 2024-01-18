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
        // Clone the existingItem to avoid mutating the original state
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        const updatedState = state.map(item => (item.id === id ? updatedItem : item));
        saveCartToLocalStorage(updatedState);
        return updatedState;
      } else {
        // Clone the state before pushing the new item
        const updatedState = [...state, { id, title, price, quantity: 1 }];
        saveCartToLocalStorage(updatedState);
        return updatedState;
      }
    },
    remove: (state, action) => {
      const itemId = action.payload;
      const newState = state.filter(item => item.id !== itemId);
      saveCartToLocalStorage(newState);
      return newState;
    },
    removeAll: (state) => {
      saveCartToLocalStorage([]);
      return [];
    },
    updateQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const updatedCart = state.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    },
    // setUserCart: (state, action) => {
    //   const userCart = action.payload;
    //   saveCartToLocalStorage(userCart);
    //   return userCart;
    // },
    setUserCart: (state, action) => {
      // Separate user-specific cart from the main cart state
      state.userCart = action.payload;
      saveCartToLocalStorage(state.data);
    },
    clearUserCart: (state) => {
      // Clear user-specific cart
      state.userCart = [];
      saveCartToLocalStorage(state.userCart); 
    },
  },
});

export const { add, remove, removeAll, updateQuantity, setUserCart } = cartSlice.actions;
export default cartSlice.reducer;
