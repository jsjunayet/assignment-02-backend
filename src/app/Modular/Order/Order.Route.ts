import express from 'express';
import { AllOrderControllers } from './Order.Controllers';
const router = express.Router();

router.post('/orders', AllOrderControllers.CreateOrderInMonogdb);
router.get('/orders/revenue', AllOrderControllers.CalculateRevenueInMongodb);

export const OrderRouter = router;
