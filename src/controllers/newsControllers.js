import {
  CreateNewsService,
  getAllNewsService,
  getByIdNewsService,
  updateNewsService,
} from "../services/newsServices.js";

export const createNewsController = async (req, res) => {
  try {
    const result = await CreateNewsService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllNewsController = async (req, res) => {
  try {
    const result = await getAllNewsService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getByIdNewsController = async (req, res) => {
  try {
    const result = await getByIdNewsService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateNewsController = async (req, res) => {
  try {
    const result = await updateNewsService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const deleteProductController = async (req, res) => {
//   try {
//     const result = await deleteProductService(req);
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
