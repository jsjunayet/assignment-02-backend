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
exports.CarServices = void 0;
const Car_Model_1 = require("./Car.Model");
const CreateCarService = (Car) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Car_Model_1.CarModel.create(Car);
    return result;
});
const GetCarService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Car_Model_1.CarModel.find();
    return result;
});
const GetSingleCarService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Car_Model_1.CarModel.findOne({ _id: id });
    return result;
});
const DeletedCarService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Car_Model_1.CarModel.findByIdAndDelete({ _id: id });
    return result;
});
const updateCarService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Car_Model_1.CarModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
    return result;
});
exports.CarServices = {
    CreateCarService,
    GetCarService,
    GetSingleCarService,
    updateCarService,
    DeletedCarService
};
