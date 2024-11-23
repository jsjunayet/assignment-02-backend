import express from 'express';
import { CartAllController } from './Car.Controllers';
const router = express.Router();

router.post('/cars', CartAllController.CreateCarInMonogdb);
router.get('/cars', CartAllController.GerCarInMonogdb);
router.get('/cars/:carId', CartAllController.GerSingleCarInMonogdb);
router.delete('/cars/:carId', CartAllController.DeleltedCarInMonogdb);
router.put('/cars/:carId', CartAllController.UpdatedCarInMonogdb);

export const CarRouter = router;
