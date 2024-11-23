"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const Order_Controllers_1 = require("./Order.Controllers");
const router = express_1.default.Router();
router.post('/orders', Order_Controllers_1.AllOrderControllers.CreateOrderInMonogdb);
router.get('/orders/revenue', Order_Controllers_1.AllOrderControllers.CalculateRevenueInMongodb);
exports.OrderRouter = router;
