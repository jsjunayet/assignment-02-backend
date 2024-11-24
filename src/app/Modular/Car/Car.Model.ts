import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { CarInterface } from './Car.Interface';

const CarSchema = new Schema<CarInterface>(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1886, 'Year must be valid'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message:
          '{VALUE} is not supported. Category must be one of Sedan, SUV, Truck, Coupe, or Convertible',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'greater than 0'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be a whole number',
      },
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock is required'],
    },
  },
  { timestamps: true, versionKey: false },
);

// Create and export the Mongoose model
export const CarModel = mongoose.model('Car', CarSchema);
