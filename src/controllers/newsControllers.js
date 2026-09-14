import { CreateNewsService } from "../services/newsServices.js";


export const createProductController = async (req, res) => {
  try {
    const result = await CreateNewsService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const getAllProductController = async (req, res) => {
//   try {
//     const result = await getAllProductService(req);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// export const getByIdProductController = async (req, res) => {
//   try {
//     const result = await getByIdProductService(req);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// export const updateProductController = async (req, res) => {
//   try {
//     const result = await updateProductService(req);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// export const deleteProductController = async (req, res) => {
//   try {
//     const result = await deleteProductService(req);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
