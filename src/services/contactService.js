import {
  authorRequestModel,
  contactFormModel,
} from "../models/contactFormModel.js";

export const contactService = async (req) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return { status: "fail", data: "Resource Not Found" };
    }

    const messages = await contactFormModel.create({
      name,
      email,
      subject,
      message,
    });
    return { status: "success", data: messages };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const applyForAuthor = async (req) => {
  try {
    // 1. Correctly extract userId from headers, user payload, or body
    const userId =
      req.headers?.user_id ||
      req.user_id ||
      req.user?._id ||
      req.user?.user_id ||
      req.body?.userId;

    if (!userId) {
      return {
        status: "fail",
        data: "User authentication failed. User ID missing.",
      };
    }

    const { bio, sampleWorkUrl } = req.body;

    if (!bio || !sampleWorkUrl) {
      return {
        status: "fail",
        data: "All fields (bio, sampleWorkUrl) are required.",
      };
    }

    // 2. Check for existing pending request
    const existingReq = await authorRequestModel.findOne({
      userId,
      status: "pending",
    });

    if (existingReq) {
      return {
        status: "fail",
        data: "You already have a pending application.",
      };
    }

    // 3. Create new application
    const applications = await authorRequestModel.create({
      userId,
      bio,
      sampleWorkUrl,
    });

    return { status: "success", data: applications };
  } catch (error) {
    console.error("Error in applyForAuthor:", error);
    throw error;
  }
};
