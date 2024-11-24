import { ObjectId } from 'mongoose';
export interface OrderInterface {
  email: string;
  car: string | ObjectId;
  quantity: number;
  totalPrice: number;
}
