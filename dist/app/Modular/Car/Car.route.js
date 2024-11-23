"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRouter = void 0;
const express_1 = __importDefault(require("express"));
const Car_Controllers_1 = require("./Car.Controllers");
const router = express_1.default.Router();
router.post('/cars', Car_Controllers_1.CartAllController.CreateCarInMonogdb);
router.get('/cars', Car_Controllers_1.CartAllController.GerCarInMonogdb);
router.get('/cars/:carId', Car_Controllers_1.CartAllController.GerSingleCarInMonogdb);
router.delete('/cars/:carId', Car_Controllers_1.CartAllController.DeleltedCarInMonogdb);
router.put('/cars/:carId', Car_Controllers_1.CartAllController.UpdatedCarInMonogdb);
exports.CarRouter = router;
