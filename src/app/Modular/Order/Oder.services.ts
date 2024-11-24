import { CarModel } from '../Car/Car.Model';
import { OrderInterface } from './Order.Interface';
import { OrderModel } from './Order.Model';

const CreateOrderService = async (Order: OrderInterface) => {
  const car = await CarModel.findById(Order.car);
  if (!car) {
    return {
      success: false,
      message: 'The car you are trying to order does not exist.',
    };
  }

  if (car.quantity < Order.quantity) {
    return {
      success: false,
      message: `Insufficient stock. ${car.quantity == 0 ? `There is not item available` : `Only ${car.quantity}  items are available.`} `,
    };
  }
  // it use for reference carID and calculate
  // const totalPrice = car.price * Order.quantity;
  car.quantity -= Order.quantity;

  if (car.quantity === 0) {
    car.inStock = false;
  }
  await car.save();
  // it use for reference carID and calculate
  // const result = await OrderModel.create({
  //   ...Order,
  //   totalPrice,
  // });
  const result = await OrderModel.create(Order);

  return {
    success: true,
    message: result,
  };
};

const CalculateRevenueService = async () => {
  const result = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'cars',
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    { $unwind: '$carDetails' },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ['$carDetails.price', '$quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  // it's not used reference in revenue
  // const result = await OrderModel.aggregate([
  //   { $group: { _id: 'null', totalRevenue: { $sum: '$totalPrice' } } },
  //   { $project: { _id: 0, totalRevenue: 1 } },
  // ]);
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};
export const AllOrderServices = {
  CreateOrderService,
  CalculateRevenueService,
};
