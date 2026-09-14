import { DecodeToken } from "../utility/tokenHelper.js";


export const Protect = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res
                .status(401)
                .json({ status: "fail", message: "Unauthorized: Please login first" });
        }

        const decoded = DecodeToken(token);

        if (!decoded) {
            return res
                .status(401)
                .json({ status: "fail", message: "Unauthorized: Invalid token" });
        }

        // Set user information in request headers for controllers
        // req.user = {
        //   email: decoded.email,
        //   role: decoded.role,
        //   user_id: decoded.user_id,
        // };

        req.user = decoded;
        req.headers.email = decoded.email;
        req.headers.role = decoded.role;
        req.headers.user_id = decoded.user_id;

        next();
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            Error: error.toString(),
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    status: "fail",
                    message: "Unauthorized - Please login",
                });
            }
            const userRole = req.user.role?.trim();
            if (!roles.includes(userRole)) {
                return res.status(403).json({
                    status: "fail",
                    message: "Forbidden Access",
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",

                Error: error.toString(),
            });
        }
    };
};