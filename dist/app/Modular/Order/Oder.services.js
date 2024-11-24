"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllOrderServices = void 0;
const Car_Model_1 = require("../Car/Car.Model");
const Order_Model_1 = require("./Order.Model");
const CreateOrderService = (Order) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield Car_Model_1.CarModel.findById(Order.car);
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
    yield car.save();
    // it use for reference carID and calculate
    // const result = await OrderModel.create({
    //   ...Order,
    //   totalPrice,
    // });
    const result = yield Order_Model_1.OrderModel.create(Order);
    return {
        success: true,
        message: result,
    };
});
const CalculateRevenueService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order_Model_1.OrderModel.aggregate([
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
                    $sum: { $multiply: ['$carDetails.price', '$quantity'] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1
            }
        }
    ]);
    // it's not used reference in revenue
    // const result = await OrderModel.aggregate([
    //   { $group: { _id: 'null', totalRevenue: { $sum: '$totalPrice' } } },
    //   { $project: { _id: 0, totalRevenue: 1 } },
    // ]);
    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
    return totalRevenue;
});
exports.AllOrderServices = {
    CreateOrderService,
    CalculateRevenueService,
};
