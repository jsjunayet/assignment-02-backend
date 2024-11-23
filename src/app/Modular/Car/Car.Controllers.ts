import { Request, Response } from 'express';
import { CarServices } from './Car.Services';
import { CarValidation } from './car.validationZod';
import { z } from 'zod';
const CreateCarInMonogdb = async (req: Request, res: Response) => {
  try {
    const validatedCar = CarValidation.parse(req.body);

    const data = await CarServices.CreateCarService(validatedCar);
    res
      .status(200)
      .json({ message: 'Car created successfully', success: true, data: data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Define the type for errors
      type ValidationError = {
        [key: string]: {
          message: string;
          name: string;
          properties: {
            message: string;
            type: string;
            value: string;
          };
          kind: string;
          path: string;
          value: number | string | boolean;
        };
      };

      // Use the type for the reduce accumulator
      const errors = err.errors.reduce<ValidationError>((acc, curr) => {
        const field = String(curr.path[0]); // Ensure the field is a string
        acc[field] = {
          message: curr.message,
          name: 'ValidatorError',
          properties: {
            message: curr.message,
            type: curr.code,
            value: field,
          },
          kind: curr.code,
          path: field,
          value: field,
        };
        return acc;
      }, {});

      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: errors,
        },
        stack: err.stack,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  }
};

const GerCarInMonogdb = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const data = await CarServices.GetCarService(searchTerm as string);
    if (data.length === 0) {
      res.status(404).json({
        message: 'No cars found for the given search term',
        success: false,
        data: [],
      });
      return;
    }
    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      data: data,
    });
  } catch (err) {
    res
      .status(200)
      .json({ message: 'Car retrieved failed', success: false, data: err });
  }
};
const GerSingleCarInMonogdb = async (req: Request, res: Response) => {
  try {
    const id = req.params.carId;
    const data = await CarServices.GetSingleCarService(id);
    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      data: data,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Car retrieved failed', success: false, data: err });
  }
};
const UpdatedCarInMonogdb = async (req: Request, res: Response) => {
  try {
    const id = req.params.carId;
    const body = req.body;
    const data = await CarServices.updateCarService(id, body);
    if (!data) {
      res.status(404).json({
        message: 'Car update not found',
        status: false,
        data: data,
      });
      return;
    }
    res.status(200).json({
      message: 'Car updated successfully',
      status: true,
      data: data,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Car updated failed', success: false, data: err });
  }
};
const DeleltedCarInMonogdb = async (req: Request, res: Response) => {
  try {
    const id = req.params.carId;
    const data = await CarServices.DeletedCarService(id);
    if (!data) {
      res.status(404).json({
        message: 'Car not found',
        status: false,
        data: {},
      });
      return;
    }
    res.status(200).json({
      message: 'Car deleted successfully',
      status: true,
      data: {},
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Car deleted falied', success: false, data: err });
  }
};

export const CartAllController = {
  CreateCarInMonogdb,
  GerCarInMonogdb,
  GerSingleCarInMonogdb,
  UpdatedCarInMonogdb,
  DeleltedCarInMonogdb,
};
