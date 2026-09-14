import jwt from "jsonwebtoken";

export const CreateToken = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

export const DecodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const getCookieOption = (days = 1) => {
    const expires =
        days === 0 ?
            new Date(0)
            : new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return {
        expires: expires, //24h
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
    };
};