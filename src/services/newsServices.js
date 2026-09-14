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

// export const getAllProductService = async (req) => {
//   try {
//     const products = await ProductModel.aggregate([
//       {
//         $lookup: {
//           from: "brands",
//           localField: "brandId",
//           foreignField: "_id",
//           as: "Brand",
//         },
//       },
//       {
//         $lookup: {
//           from: "categories",
//           localField: "categoryId",
//           foreignField: "_id",
//           as: "Category",
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "User",
//         },
//       },
//       {
//         $unwind: {
//           path: "$Brand",
//         },
//       },
//       {
//         $unwind: {
//           path: "$Category",
//         },
//       },
//       {
//         $unwind: {
//           path: "$User",
//         },
//       },
//       {
//         $project: {
//           "User.password": 0,
//           "User.mobile": 0,
//           "User.otp": 0,
//           "User.otpExpiry": 0,
//           "User.status": 0,
//           "User.createdDate": 0,
//           "User.updatedAt": 0,
//           "Brand.createdAt": 0,
//           "Brand.description": 0,
//           "Category.createdAt": 0,
//           "Category.description": 0,
//           __v: 0,
//           userId: 0,
//           brandId: 0,
//           categoryId: 0,
//         },
//       },
//     ]);

//     return { status: "success", data: products };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getByIdProductService = async (req) => {
//   try {
//     let ProductId = req.params.ProductId;
//     if (!ProductId || !ObjectID.isValid(ProductId)) {
//       return { status: "fail", data: "Resource Not Found" };
//     }

//     const productData = await ProductModel.aggregate([
//       {
//         $match: {
//           _id: new ObjectID(ProductId),
//         },
//       },
//       {
//         $lookup: {
//           from: "brands",
//           localField: "brandId",
//           foreignField: "_id",
//           as: "Brand",
//         },
//       },
//       {
//         $lookup: {
//           from: "categories",
//           localField: "categoryId",
//           foreignField: "_id",
//           as: "Category",
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "User",
//         },
//       },
//       {
//         $unwind: {
//           path: "$Brand",
//         },
//       },
//       {
//         $unwind: {
//           path: "$Category",
//         },
//       },
//       {
//         $unwind: {
//           path: "$User",
//         },
//       },
//       {
//         $project: {
//           "User.password": 0,
//           "User.mobile": 0,
//           "User.otp": 0,
//           "User.otpExpiry": 0,
//           "User.status": 0,
//           "User.createdDate": 0,
//           "User.updatedAt": 0,
//           "Brand.createdAt": 0,
//           "Brand.description": 0,
//           "Category.createdAt": 0,
//           "Category.description": 0,
//           __v: 0,
//           userId: 0,
//           brandId: 0,
//           categoryId: 0,
//         },
//       },
//     ]);
//     if (!productData) {
//       return { status: "fail", data: "Resource Not Found" };
//     }
//     return { status: "success", data: productData };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const updateProductService = async (req) => {
//   try {
//     const productId = req.params.productId;
//     const reqBody = req.body;

//     //delete sensitive field
//     delete reqBody.userId;
//     delete reqBody._id;

//     const updatedProduct = await ProductModel.findOneAndUpdate(
//       productId,
//       { $set: reqBody },
//       { new: true, runValidators: true },
//     );
//     if (!updatedProduct) {
//       return { status: "fail", data: "Resource Not Found" };
//     }
//     return { status: "success", data: updatedProduct };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

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
