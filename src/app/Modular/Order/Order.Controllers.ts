import { Request, Response } from 'express';
import { AllOrderServices } from './Oder.services';

const CreateOrderInMonogdb = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await AllOrderServices.CreateOrderService(body);
    if (data.success) {
      res.status(200).json({
        message: 'Order created successfully',
        success: true,
        data: data.message,
      });
      return;
    }
    res.status(500).json({
      message: 'Order created failed',
      success: false,
      error: data.message,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Order created successfully',
      success: false,
      err,
    });
  }
};

const CalculateRevenueInMongodb = async (req: Request, res: Response) => {
  try {
    const data = await AllOrderServices.CalculateRevenueService();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Revenue calculated failed',
      status: false,
      data: err,
    });
  }
};
export const AllOrderControllers = {
  CreateOrderInMonogdb,
  CalculateRevenueInMongodb,
};