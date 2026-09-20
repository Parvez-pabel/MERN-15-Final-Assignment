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

// export const getAllNewsService = async (req) => {
//   try {
//     const allNews = await NewsModel.aggregate([
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
//           "Category.createdAt": 0,
//           "Category.description": 0,
//           __v: 0,
//           userId: 0,
//           categoryId: 0,
//         },
//       },
//     ]);

//     return { status: "success", data: allNews };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getAllNewsService = async (req) => {
  try {
    //pagination
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    const result = await NewsModel.aggregate([
      {
        $facet: {
          //for total count
          totalCount: [{ $count: "count" }],

          newsData: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },

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
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $unwind: {
                path: "$User",
                preserveNullAndEmptyArrays: true,
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
          ],
        },
      },
    ]);
    const total = result[0]?.totalCount[0]?.count || 0;
    const news = result[0]?.newsData || [];
    const totalPages = Math.ceil(total / limit);
    return {
      status: "success",
      pagination: {
        totalNews: total,
        currentPage: page,
        totalPages: totalPages,
        limit: limit,
      },
      data: news,
    };
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
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$User",
          preserveNullAndEmptyArrays: true,
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

export const userNewsListService = async (req) => {
  try {
    const userId = req.headers.user_id || req.user?.user_id || req.body.userId;

    if (!userId) {
      return { status: "fail", data: "User ID missing" };
    }

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await NewsModel.aggregate([
      { $match: { userId: userObjectId } },

      {
        $facet: {
          totalCount: [{ $count: "count" }],
          newsData: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "Category",
              },
            },
            {
              $unwind: {
                path: "$Category",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                "Category.createdAt": 0,
                "Category.description": 0,
                __v: 0,
                categoryId: 0,
              },
            },
          ],
        },
      },
    ]);

    const total = result[0]?.totalCount[0]?.count || 0;
    const news = result[0]?.newsData || [];
    const totalPages = Math.ceil(total / limit);

    return {
      status: "success",
      pagination: {
        totalNews: total,
        currentPage: page,
        totalPages: totalPages,
        limit: limit,
      },
      data: news,
    };
  } catch (error) {
    return {
      status: "error",
      data: "Internal Server Error",
      Error: error.toString(),
    };
  }
};

export const deleteNewsService = async (req) => {
  try {
    const NewsId = req.params.id;
    const data = await NewsModel.findByIdAndDelete(NewsId);
    if (!data) {
      return { status: "fail", data: "Resource Not Found" };
    }
    return { status: "success", data: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
