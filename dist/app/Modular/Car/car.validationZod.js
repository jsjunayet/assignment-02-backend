"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
exports.CarValidation = zod_1.z.object({
    brand: zod_1.z.string().min(1, 'Brand is required'),
    model: zod_1.z.string().min(1, 'Model is required'),
    year: zod_1.z
        .number()
        .min(1886, 'Year must be valid')
        .max(new Date().getFullYear(), 'Year cannot be in the future'),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
        errorMap: () => ({
            message: 'Invalid category. Must be one of Sedan, SUV, Truck, Coupe, or Convertible',
        }),
    }),
    description: zod_1.z.string().min(1, 'Description is required'),
    quantity: zod_1.z.number().int().min(0, 'Quantity must be a non-negative integer'),
    inStock: zod_1.z.boolean({ required_error: 'InStock is required' }),
});
