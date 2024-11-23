"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const CarSchema = new mongoose_2.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String,
        required: [true, "Category is required"],
        enum: {
            values: ["Sedan", "SUV", "Truck", "Coupe", "Convertible"],
            message: '{VALUE} is not supported'
        } },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, { timestamps: true });
exports.CarModel = mongoose_1.default.model('Car', CarSchema);
