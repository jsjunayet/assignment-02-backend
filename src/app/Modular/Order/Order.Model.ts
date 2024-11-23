import mongoose, { Schema } from 'mongoose';
import { OrderInterface } from './Order.Interface';

const OrderSchema = new Schema<OrderInterface>({
  email: { type: String, required: [true, 'please enter your email'] },
  car: { type: String, required: [true, 'please enter your car ID'] },
  quantity: {
    type: Number,
    min: [1, 'greater than 1'],
    required: [true, 'please enter your email'],
  },
  totalPrice: { type: Number },
});

export const OrderModel = mongoose.model('Order', OrderSchema);
