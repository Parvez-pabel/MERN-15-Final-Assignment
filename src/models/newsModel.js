import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "News title is required"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "News image is required"],
        },
        location: {
            type: String,
            required: [true, "News location is required"],
            trim: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "User is required"],
        },
        details: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true },
);

const NewsModel = mongoose.model("news", newsSchema);
export default NewsModel;