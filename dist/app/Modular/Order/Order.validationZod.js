"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
exports.OrderValidation = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, 'email is required')
        .email('Please provide a valid email address'),
    car: zod_1.z.string().min(1, 'car is required'),
    quantity: zod_1.z.number().int().min(1, 'Quantity must be at least 1'),
});
