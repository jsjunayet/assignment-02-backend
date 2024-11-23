import { z } from 'zod';

export const OrderValidation = z.object({
  email: z
    .string()
    .min(1, 'email is required')
    .email('Please provide a valid email address'),
  car: z.string().min(1, 'car is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});
