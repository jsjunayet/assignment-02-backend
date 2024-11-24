import mongoose, { Schema } from 'mongoose';
import { OrderInterface } from './Order.Interface';

const OrderSchema = new Schema<OrderInterface>(
  {
    email: {
      type: String,
      required: [true, 'please enter your email. email is required'],
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'please enter your carID'],
    },
    quantity: {
      type: Number,
      min: [1, 'greater than 0'],
      required: [true, 'please enter your quantity. quantity is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'please enter your totalPrice. totalPrice is required'],
    },
  },
  { timestamps: true, versionKey: false },
);

export const OrderModel = mongoose.model('Order', OrderSchema);
