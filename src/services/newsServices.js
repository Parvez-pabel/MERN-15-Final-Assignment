import mongoose from "mongoose";
import NewsModel from "../models/newsModel.js";
const ObjectID = mongoose.Types.ObjectId;

export const CreateNewsService = async (req) => {
  try {
    const { title, image, categoryId, location, details } = req.body;
    const userId = req.headers.user_id || req.user?.user_id || req.body.userId; //eta middleware theke ashbe
    //required field
    if (!title || !image || !location || !categoryId || !details || !userId) {
      return { status: "fail", data: "Required fields are missing" };
    }
    //clean object for not injecting perasite any field

    const newsData = {
      title,
      image,
      location,
      categoryId,
      details,
      userId,
    };
    const news = await NewsModel.create(newsData);
    return { status: "success", data: news };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllNewsService = async (req) => {
  try {
    const allNews = await NewsModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "Category",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "User",
        },
      },
      {
        $unwind: {
          path: "$Category",
        },
      },
      {
        $unwind: {
          path: "$User",
        },
      },
      {
        $project: {
          "User.password": 0,
          "User.mobile": 0,
          "User.otp": 0,
          "User.otpExpiry": 0,
          "User.status": 0,
          "User.createdDate": 0,
          "User.updatedAt": 0,
          "Category.createdAt": 0,
          "Category.description": 0,
          __v: 0,
          userId: 0,
          categoryId: 0,
        },
      },
    ]);

    return { status: "success", data: allNews };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getByIdNewsService = async (req) => {
  try {
    let NewsId = req.params.id;
    if (!NewsId || !ObjectID.isValid(NewsId)) {
      return { status: "fail", data: "Resource Not Found" };
    }

    const NewsData = await NewsModel.aggregate([
      {
        $match: {
          _id: new ObjectID(NewsId),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "Category",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "User",
        },
      },
      {
        $unwind: {
          path: "$Category",
        },
      },
      {
        $unwind: {
          path: "$User",
        },
      },
      {
        $project: {
          "User.password": 0,
          "User.mobile": 0,
          "User.otp": 0,
          "User.otpExpiry": 0,
          "User.status": 0,
          "User.createdDate": 0,
          "User.updatedAt": 0,
          "Category.createdAt": 0,
          "Category.description": 0,
          __v: 0,
          userId: 0,
          categoryId: 0,
        },
      },
    ]);
    if (!NewsData) {
      return { status: "fail", data: "Resource Not Found" };
    }
    return { status: "success", data: NewsData };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNewsService = async (req) => {
  try {
    const NewsId = req.params.id;
    const reqBody = req.body;

    //delete sensitive field
    delete reqBody.userId;
    delete reqBody._id;

    const updatedNews = await NewsModel.findByIdAndUpdate(
      NewsId,
      { $set: reqBody },
      { new: true, runValidators: true },
    );
    if (!updatedNews) {
      return { status: "fail", data: "Resource Not Found" };
    }
    return { status: "success", data: updatedNews };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const deleteProductService = async (req) => {
//   try {
//     const ProductId = req.params.ProductId;
//     const data = await ProductModel.findByIdAndDelete(ProductId);
//     if (!data) {
//       return { status: "fail", data: "Resource Not Found" };
//     }
//     return { status: "success", data: data };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
