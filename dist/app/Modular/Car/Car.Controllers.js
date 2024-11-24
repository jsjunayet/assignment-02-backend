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
exports.CartAllController = void 0;
const Car_Services_1 = require("./Car.Services");
const CreateCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const BodyCar = req.body;
        const data = yield Car_Services_1.CarServices.CreateCarService(BodyCar);
        res
            .status(200)
            .json({ message: 'Car created successfully', success: true, data: data });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                message: 'Validation failed',
                success: false,
                error: err.errors, // Type assertion to access 'errors'
                stack: err.stack,
            });
        }
    }
});
const GerCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const data = yield Car_Services_1.CarServices.GetCarService(searchTerm);
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
    }
    catch (err) {
        res
            .status(500)
            .json({ message: 'Car retrieved failed', success: false, data: err });
    }
});
const GerSingleCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const data = yield Car_Services_1.CarServices.GetSingleCarService(id);
        if (!data) {
            res.status(404).json({
                message: 'Car ID not found',
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
    }
    catch (err) {
        res
            .status(500)
            .json({ message: 'Car retrieved failed', success: false, data: err });
    }
});
const UpdatedCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const body = req.body;
        const data = yield Car_Services_1.CarServices.updateCarService(id, body);
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
    }
    catch (err) {
        res
            .status(500)
            .json({ message: 'Car updated failed', success: false, data: err });
    }
});
const DeleltedCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const data = yield Car_Services_1.CarServices.DeletedCarService(id);
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
    }
    catch (err) {
        res
            .status(500)
            .json({ message: 'Car deleted falied', success: false, data: err });
    }
});
exports.CartAllController = {
    CreateCarInMonogdb,
    GerCarInMonogdb,
    GerSingleCarInMonogdb,
    UpdatedCarInMonogdb,
    DeleltedCarInMonogdb,
};
