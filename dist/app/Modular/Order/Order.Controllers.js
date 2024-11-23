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
exports.AllOrderControllers = void 0;
const Oder_services_1 = require("./Oder.services");
const CreateOrderInMonogdb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield Oder_services_1.AllOrderServices.CreateOrderService(body);
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
    }
    catch (err) {
        res.status(500).json({
            message: 'Order created successfully',
            success: false,
            err,
        });
    }
});
const CalculateRevenueInMongodb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Oder_services_1.AllOrderServices.CalculateRevenueService();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: data,
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Revenue calculated failed',
            status: false,
            data: err,
        });
    }
});
exports.AllOrderControllers = {
    CreateOrderInMonogdb,
    CalculateRevenueInMongodb,
};
