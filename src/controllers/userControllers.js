import { loginService, userRegistrationService, verifyOTPService } from "../services/userServices.js";
import { getCookieOption } from "../utility/tokenHelper.js";

export const registration = async (req, res) => {
    try {
        const result = await userRegistrationService(req);
        res.status(200).json({ success: true, data: result });
        console.log(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const result = await verifyOTPService(req, res);
        console.log(result);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginService(req);
        if (result.status === "success") {
            let cookieOption = getCookieOption(1);
            res.cookie("token", result.token, cookieOption);

            return res.status(200).json({
                status: "success",
                message: "Login Successfully",
                data: result.user,
            });
        } else {
            res.status(401).json({ status: "fail", message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};