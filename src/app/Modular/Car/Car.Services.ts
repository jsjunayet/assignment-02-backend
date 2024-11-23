import { CarInterface } from './Car.Interface';
import { CarModel } from './Car.Model';

const CreateCarService = async (Car: CarInterface) => {
  const result = await CarModel.create(Car);
  return result;
};
const GetCarService = async (searchTerm: string) => {
  if (!searchTerm) {
    const result = await CarModel.find();
    return result;
  }
  const query = {
    $or: [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ],
  };
  const result = await CarModel.find(query);
  return result;
};
const GetSingleCarService = async (id: string) => {
  const result = await CarModel.findOne({ _id: id });
  return result;
};
const DeletedCarService = async (id: string) => {
  const result = await CarModel.findByIdAndDelete({ _id: id });
  return result;
};
const updateCarService = async (id: string, updatedData: object) => {
  const result = await CarModel.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true },
  );
  return result;
};

export const CarServices = {
  CreateCarService,
  GetCarService,
  GetSingleCarService,
  updateCarService,
  DeletedCarService,
};
