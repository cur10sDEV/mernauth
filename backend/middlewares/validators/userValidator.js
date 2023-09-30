import { body } from "express-validator";
import User from "../../models/userModel.js";

export const nameValidation = () => {
  return body("name")
    .escape()
    .isLength({ min: 2 })
    .withMessage("Username should be minimum 2 characters long");
};

export const emailValidation = () => {
  return body("email")
    .escape()
    .isEmail()
    .withMessage("Please enter a valid email");
};

export const passwordValidation = () => {
  return body("password")
    .escape()
    .isLength({ min: 8, max: 128 })
    .withMessage("Please enter a valid password.");
};

export const confirmPasswordValidation = () => {
  return body("confirmPassword")
    .escape()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password and Confirm Password do not match");
};

export const isEmailUnique = () => {
  return body("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error(
        "Email already exists, Please login using this email or use another email for signup."
      );
    }
  });
};
