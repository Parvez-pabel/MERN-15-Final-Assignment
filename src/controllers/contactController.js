import { applyForAuthor, contactService } from "../services/contactService.js";

export const contactController = async (req, res) => {
  try {
    const result = await contactService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applyForAuthorController = async (req, res) => {
  try {
    const result = await applyForAuthor(req);

    if (result.status === "fail") {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal server error",
    });
  }
};
