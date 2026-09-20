import {
  loginService,
  logoutService,
  ProfileDetailsService,
  ProfileUpdateService,
  userDeleteService,
  userRegistrationService,
  verifyOTPService,
} from "../services/userServices.js";
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

export const ProfileDetails = async (req, res) => {
  try {
    const result = await ProfileDetailsService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ProfileUpdate = async (req, res) => {
  try {
    const result = await ProfileUpdateService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const result = await userDeleteService(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// //reset password send otp
// export const sendOtp = async (req, res) => {
//     try {
//         const result = await sendOtpService(req);
//         res.status(200).json({ success: true, data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// //admin
// export const getAllUser = async (req, res) => {
//     try {
//         const result = await getAllUserService(req);
//         res.status(200).json({ success: true, data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

export const logoutController = async (req, res) => {
  try {
    const result = await logoutService(req);

    res.cookie("token", "", getCookieOption(0));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Logout failed",
    });
  }
};
