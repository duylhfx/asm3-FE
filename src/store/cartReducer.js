import { createSlice } from "@reduxjs/toolkit";

const cartInit = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState: cartInit,
  reducers: {
    addCart(state, action) {
      const index = state.items.findIndex(
        (el) => el.name === action.payload.name
      );
      if (index >= 0) {
        state.items[index].quantity += action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    removeCart(state, action) {
      state.items = [];
      localStorage.removeItem("cart");
    },

    removeItem(state, action) {
      state.items = state.items.filter((el) => el.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    addItem(state, action) {
      const index = state.items.findIndex((el) => el.id === action.payload);
      state.items[index].quantity < 99
        ? (state.items[index].quantity += 1)
        : (state.items[index].quantity = 99);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    minusItem(state, action) {
      const index = state.items.findIndex((el) => el.id === action.payload);
      state.items[index].quantity > 1
        ? (state.items[index].quantity -= 1)
        : (state.items[index].quantity = 1);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addCart, removeItem, addItem, minusItem, removeCart } =
  cartReducer.actions;
export default cartReducer.reducer;
