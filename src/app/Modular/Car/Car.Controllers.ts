import { Request, Response } from 'express';
import { CarServices } from './Car.Services';
const CreateCarInMonogdb = async (req: Request, res: Response) => {
  try {
    const BodyCar = req.body;

    const data = await CarServices.CreateCarService(BodyCar);
    res
      .status(200)
      .json({ message: 'Car created successfully', success: true, data: data });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        message: 'Validation failed',
        success: false,
        error: (err as { errors?: unknown }).errors, // Type assertion to access 'errors'
        stack: err.stack,
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
        data: data,
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
      .status(500)
      .json({ message: 'Car retrieved failed', success: false, data: err });
  }
};
const GerSingleCarInMonogdb = async (req: Request, res: Response) => {
  try {
    const id = req.params.carId;
    const data = await CarServices.GetSingleCarService(id);
    if(!data){
      res.status(404).json({
        message: 'Car ID not found',
        success: false,
        data: data,
      });
      return
    }
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
        message: 'Car ID not found',
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
        message: 'Car ID not found',
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
