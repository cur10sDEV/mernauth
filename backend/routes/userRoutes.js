import { Router } from "express";
// controllers
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
// validatiors
import {
  confirmPasswordValidation,
  emailValidation,
  isEmailUnique,
  nameValidation,
  passwordValidation,
} from "../middlewares/validators/userValidator.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = Router();

// ====> public routes

// @desc - register a user
router.post(
  "/",
  [
    nameValidation(),
    emailValidation(),
    passwordValidation(),
    confirmPasswordValidation(),
    isEmailUnique(),
  ],
  registerUser
);

// @desc - authenticate a user and get token
router.post("/auth", [emailValidation(), passwordValidation()], authUser);

// @desc - logout user - clear cookie
router.post("/logout", logoutUser);

// ====> private routes

// @desc - get user profile - GET
// @desc - update a user profile - PUT
router
  .route("/profile")
  .get(isAuth, getUserProfile)
  .put(isAuth, updateUserProfile);

export default router;
