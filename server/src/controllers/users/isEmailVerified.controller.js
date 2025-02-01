import UsersModel from "../../models/users.model";
import emailVerificationTemplate from "../../templates/emailVerification";
import {
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper";

const isEmailVerified = async (req, res) => {
  let loginId = req.user._id;
  let role = req.user.role;
  try {
    const emailVerification = await UsersModel.findOne({
      _id: loginId,
    }).select("+isEmailVerified");

    if (!emailVerification) {
      return successWithResponse(res, "User not found.");
    }

    if (emailVerification.isEmailVerified) {
      return successWithResponse(res, "Email already verified.");
    }

    let verificationTemplate = await emailVerificationTemplate(
      emailVerification.username,
      "https:"
    );

    let emailVerificationToken = Math.random().toString(36).substr(2, 10);

    emailVerification.verificationToken = emailVerificationToken;
    emailVerification.save();

    return successWithResponse(res, "Email verification send successfully.");
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default isEmailVerified;
