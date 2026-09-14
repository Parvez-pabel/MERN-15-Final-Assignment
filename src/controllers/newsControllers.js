import {
  CreateNewsService,
  deleteNewsService,
  getAllNewsService,
  getByIdNewsService,
  updateNewsService,
  userNewsListService,
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

export const UserNewsList = async (req, res) => {
  try {
    const result = await userNewsListService(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
export const deleteNews = async (req, res) => {
  try {
    const result = await deleteNewsService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
