import userModel from "../models/userModel.js";
import { ComparePassword, HashPassword } from "../utility/passHash.js";
import { CreateToken } from "../utility/tokenHelper.js";

export const userRegistrationService = async (req) => {
  try {
    let { email, name, password } = req.body;

    let userCount = await userModel.countDocuments({
      email: email,
    });
    console.log(userCount);
    if (userCount > 0) {
      return { status: "fail", data: "Email already exist" };
    }

    let otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    const otpExpiryTime = new Date(Date.now() + 2 * 60 * 1000); // OTP valid for 2 minutes
    // let emailTo = email;
    // let emailSubject = "Inventory App Email Verification";
    // let emailText = registrationOTP(otp);

    // try {
    //     await EmailSend(emailTo, emailSubject, emailText);
    // } catch (emailErr) {
    //     console.error("Email Error:", emailErr);
    //     return {
    //         status: "fail",
    //         data: "Could not send verification email. Please try again.",
    //     };
    // }

    password = await HashPassword(password);
    otp = otp;
    await userModel.create({
      email,
      name,
      password,
      otp,
      otpExpiry: otpExpiryTime,
    });
    return { status: "success", data: "OTP has been sent to your email" };
  } catch (error) {
    return {
      status: "fail",
      data: "internal server error",
      Error: error.toString(),
    };
  }
};

export const verifyOTPService = async (req, res) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;

    let user = await userModel.findOne({
      email: email,
      otp: otp,
    });
    console.log(user);

    if (user) {
      const currentTime = new Date();
      if (currentTime > user.otpExpiry) {
        return {
          status: "fail",
          data: "OTP has expired, please request a new OTP",
        };
      }

      await userModel.updateOne(
        { email: email },
        {
          $set: {
            otp: "0",
            status: "verified",
          },
        },
      );
      return { status: "success", data: "Registration Success" };
    } else {
      return { status: "fail", data: "Invalid OTP" };
    }
  } catch (error) {
    return {
      status: "fail",
      data: "internal server error",
      Error: error.toString(),
    };
  }
};

export const loginService = async (req) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({
      email: email,
      status: "verified",
    });
    if (!user) {
      return { status: "fail", data: "User Not Found" };
    }
    let isMatch = await ComparePassword(password, user.password);
    if (!isMatch) {
      return { status: "fail", data: "Wrong Password" };
    }
    let tokenPayload = {
      email: user.email,
      role: user.role,
      user_id: user._id,
    };
    let token = await CreateToken(tokenPayload);

    return { status: "success", token, user: tokenPayload };
  } catch (error) {
    return { status: "error", data: "Internal Server Error" };
  }
};

export const ProfileDetailsService = async (req) => {
  try {
    let userID = req.user.user_id;
    let data = await userModel.findOne(
      {
        _id: userID,
      },
      {
        password: 0,
        otp: 0,
        otpExpiry: 0,
        status: 0,
      },
    );
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "error",
      data: "Internal Server Error",
      Error: error.toString(),
    };
  }
};

export const ProfileUpdateService = async (req) => {
  try {
    let userID = req.user.user_id;
    console.log(userID);
    let reqBody = req.body;
    console.log(reqBody);

    delete reqBody.email;
    delete reqBody.password;
    delete reqBody.role;
    let data = await userModel.updateOne({ _id: userID }, { $set: reqBody });
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "error",
      data: "Internal Server Error",
      error: error.message,
    };
  }
};

export const userDeleteService = async (req) => {
  try {
    let userId = req.params.id;
    if (!userId) {
      return { status: "fail", data: "User Not Found" };
    }
    const data = await userModel.findByIdAndDelete(userId);
    return { status: "success", data: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
