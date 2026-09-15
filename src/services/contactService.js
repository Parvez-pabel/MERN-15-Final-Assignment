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
    const userId = req.headers.user_id || req.user?.user_id || req.body.userId;
    const { bio, sampleWorkUrl } = req.body;

    if (!bio || !sampleWorkUrl) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingReq = await authorRequestModel.findOne({
      userId,
      status: "pending",
    });
    if (existingReq) {
      return { status: "fail", data: "You already have a pending application" };
    }
    const applications = await authorRequestModel.create({
      userId,
      bio,
      sampleWorkUrl,
    });
    return { status: "success", data: applications };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
