import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Order = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
  price: number;
  quantity: number;
  sugar: {
    composition: number;
    charges: number;
  };
  ice: {
    composition: number;
    charges: number;
  };
};

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        order => order.idDrink !== action.payload,
      );
    },
    updateOrderQuantity: (
      state,
      action: PayloadAction<{id: string; quantity: number}>,
    ) => {
      const orderIndex = state.orders.findIndex(
        order => order.idDrink === action.payload.id,
      );
      if (orderIndex !== -1) {
        if (action.payload.quantity === 0) {
          state.orders.splice(orderIndex, 1);
        } else {
          state.orders[orderIndex].quantity = action.payload.quantity;
        }
      }
    },
  },
});

export const {addOrder, deleteOrder, updateOrderQuantity} = orderSlice.actions;

export default orderSlice.reducer;
