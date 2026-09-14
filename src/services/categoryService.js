import { CategoryModel } from "../models/categoryModel.js";

export const categoryCreateService = async (req) => {
  try {
    let reqBody = req.body;
    const category = await CategoryModel.create(reqBody);
    return {
      status: "success",
      message: "category successfully created",
      data: category,
    };
  } catch (error) {
    return {
      status: "error",
      data: "Internal Server Error",
      error: error.message,
    };
  }
};
export const getAllCategoryService = async (req) => {
  try {
    const data = await CategoryModel.find({});
    if (!data) {
      return { status: "fail", data: "Resource Not Found" };
    } else {
      return { status: "success", data: data };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findByIdCategoryService = async (req) => {
  try {
    const id = req.params.id;
    const data = await CategoryModel.findById(id);
    if (!data) {
      return { status: "fail", data: "Resource Not Found" };
    } else {
      return { status: "success", data: data };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteService = async (req, Model) => {
  try {
    const { type, id } = req.params;

    if (!type || !modelMap[type.toLowerCase()]) {
      return { status: "fail", data: "Invalid Delete Type." };
    }
    if (!id || !ObjectId.isValid(id)) {
      return { status: "fail", data: "Invalid Id Format" };
    }

    const targetType = type.toLowerCase();
    const TargetModel = modelMap[targetType];

    const queryField = `${targetType}Id`;
    const matchQuery = { [queryField]: new ObjectId(id) };

    let checkProduct = await ProductModel.findOne(matchQuery);

    if (checkProduct) {
      return {
        status: "fail",
        data: `Can not delete ${targetType}. this ${targetType} is still associated with existing products.`,
      };
    }

    const deleteData = await TargetModel.deleteOne({ _id: new ObjectId(id) });

    if (deleteData.deletedCount === 0) {
      return { status: "fail", data: `${targetType.toUpperCase()} not found` };
    }
    return {
      status: "success",
      data: `${targetType.toUpperCase()} deleted successfully`,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};