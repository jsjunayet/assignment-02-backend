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
exports.CartAllController = exports.CarValidation = void 0;
const Car_Services_1 = require("./Car.Services");
const zod_1 = require("zod");
exports.CarValidation = zod_1.z.object({
    brand: zod_1.z.string().min(1, "Brand is required"),
    model: zod_1.z.string().min(1, "Model is required"),
    year: zod_1.z.number().min(1886, "Year must be valid").max(new Date().getFullYear(), "Year cannot be in the future"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    category: zod_1.z.enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"], {
        errorMap: () => ({ message: "Invalid category. Must be one of Sedan, SUV, Truck, Coupe, or Convertible" }),
    }),
    description: zod_1.z.string().min(1, "Description is required"),
    quantity: zod_1.z.number().int().min(0, "Quantity must be a non-negative integer"),
    inStock: zod_1.z.boolean({ required_error: "InStock is required" }),
});
const CreateCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedCar = exports.CarValidation.parse(req.body);
        const data = yield Car_Services_1.CarServices.CreateCarService(validatedCar);
        res.status(200).json({ message: "Car created successfully", success: true, data: data });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            // Use the type for the reduce accumulator
            const errors = err.errors.reduce((acc, curr) => {
                const field = String(curr.path[0]); // Ensure the field is a string
                acc[field] = {
                    message: curr.message,
                    name: "ValidatorError",
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
                message: "Validation failed",
                success: false,
                error: {
                    name: "ValidationError",
                    errors: errors,
                },
                stack: err.stack,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
                success: false,
            });
        }
    }
});
const GerCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Car_Services_1.CarServices.GetCarService();
        res.status(200).json({ message: "Car retrieved successfully", success: true, data: data });
    }
    catch (err) {
        res.status(200).json({ message: "Car retrieved failed", success: false, data: err });
    }
});
const GerSingleCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const data = yield Car_Services_1.CarServices.GetSingleCarService(id);
        res.status(200).json({ message: "Car retrieved successfully", success: true, data: data });
    }
    catch (err) {
        res.status(200).json({ message: "Car retrieved failed", success: false, data: err });
    }
});
const UpdatedCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const body = req.body;
        const data = yield Car_Services_1.CarServices.updateCarService(id, body);
        if (!data) {
            res.status(404).json({
                message: "Car update not found",
                status: false,
                data: data,
            });
        }
        res.status(200).json({
            message: "Car updated successfully",
            status: true,
            data: data,
        });
    }
    catch (err) {
        res.status(200).json({ message: "Car updated failed", success: false, data: err });
    }
});
const DeleltedCarInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.carId;
        const data = yield Car_Services_1.CarServices.DeletedCarService(id);
        if (!data) {
            res.status(404).json({
                message: "Car not found",
                status: false,
                data: {},
            });
        }
        res.status(200).json({
            message: "Car deleted successfully",
            status: true,
            data: {},
        });
    }
    catch (err) {
        res.status(200).json({ message: "Car deleted falied", success: false, data: err });
    }
});
exports.CartAllController = {
    CreateCarInMonogdb,
    GerCarInMonogdb,
    GerSingleCarInMonogdb,
    UpdatedCarInMonogdb,
    DeleltedCarInMonogdb
};
