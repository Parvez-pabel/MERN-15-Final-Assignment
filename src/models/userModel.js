//role base user model with password hashing and validation


import mongoose from "mongoose";
import validator from "validator";

const UserModelSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email address"],
        },
        role: {
            type: String,
            enum: [
                "author",
                "super admin",
                "user",
            ],
            default: "user",
        },
        name: {
            type: String,
            unique: true,
            required: true,
        },
        mobile: {
            type: String,
            unique: true,
            required: true,
            isLowercase: true,
            validate: {
                validator: function (v) {
                    return /\d{11}/.test(v);
                },
                message: (props) => `${props.value} is not valid phone number`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters long"],
        },
        photo: {
            type: String,
        },
        otp: {
            type: String,
            default: "0",
        },
        otpExpiry: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            default: "unverified",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const userModel = mongoose.model("users", UserModelSchema);
export default userModel;