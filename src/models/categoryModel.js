import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

export const CategoryModel = mongoose.model("categories", categorySchema);