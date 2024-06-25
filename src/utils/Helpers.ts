import {Order} from '../store/orderSlice';

export const calculateTotalCost = (orders: Order[]): number => {
  const totalCost = orders.reduce((accumulator, order) => {
    const orderTotal =
      order.price * order.quantity + order.sugar.charges + order.ice.charges;
    return accumulator + orderTotal;
  }, 0);

  return parseFloat(totalCost.toFixed(2));
};
