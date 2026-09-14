import {
  categoryCreateService,
  findByIdCategoryService,
  getAllCategoryService,
} from "../services/categoryService.js";

export const categoryCreate = async (req, res) => {
  try {
    const result = await categoryCreateService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllCategory = async (req, res) => {
  try {
    const result = await getAllCategoryService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const findByIdCategory = async (req, res) => {
  try {
    const result = await findByIdCategoryService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};