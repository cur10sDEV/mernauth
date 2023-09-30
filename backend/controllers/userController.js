import checker from "../utils/ValidationErrorsChecker.js";
import { matchedData } from "express-validator";
import { comparePass, getHashPass } from "../utils/hashPass.js";
import User from "../models/userModel.js";
import { genToken } from "../utils/genToken.js";

// @desc   register a user
// route   POST /api/users
// @acess  Public
export const registerUser = async (req, res, next) => {
  try {
    // checking for validation errors
    checker(req, res, next);
    const { name, email, password, confirmPassword } = matchedData(req);
    // check if pass and confirmPass are equal or not
    if (password !== confirmPassword) {
      const err = new Error("Password and Confirm Password do not match.");
      err.statusCode = 422;
      throw err;
    }

    const hashedPass = await getHashPass(password);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    // check if user successfully created or not
    if (user) {
      // generate jwt token
      await genToken(res, user._id);

      res.status(201).json({
        data: { _id: user._id, name: user.name, email: user.email },
        status: "success",
        message: "User successfully created",
      });
    } else {
      const err = new Error("User registration failed");
      err.statusCode = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

// @desc   authenticate a user and get token
// route   POST /api/users/auth
// @acess  Public
export const authUser = async (req, res, next) => {
  try {
    // checking for validation errors
    checker(req, res, next);

    const { email, password } = matchedData(req);

    // check if email exists or not
    const user = await User.findOne({ email: email });
    // check if password is correct or not
    if (user && (await comparePass(password, user.password))) {
      // generate jwt token
      await genToken(res, user._id);
      res.status(201).json({
        data: { _id: user._id, name: user.name, email: user.email },
        status: "success",
        message: "Successfully logged in",
      });
    } else {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

// @desc   logout user - clear cookie
// route   POST /api/users/logout
// @acess  Public
export const logoutUser = (req, res, next) => {
  // replacing previous jwt token with empty string and it will expires in 1s
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(201).json({
    message: "User logged out",
    status: "success",
    data: null,
  });
};

// @desc   get user profile
// route   GET /api/users/profile
// @acess  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(201).json({
        data: { _id: user._id, name: user.name, email: user.email },
        status: "success",
        message: "User profile successfully retrieved",
      });
    } else {
      const err = new Error("No user found");
      err.statusCode = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

// @desc   update a user profile
// route   PUT /api/users/profile
// @acess  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, password, confirmPassword } = req.body;
    if (user) {
      if (name || email || password || confirmPassword) {
        // if name is provided
        if (name) user.name = name;
        // if email is provided
        if (email) user.email = email;
        // if both password and confirmPassword is provided
        if (password && confirmPassword) {
          if (password !== confirmPassword) {
            const err = new Error("Password and Confirm password do not match");
            err.statusCode = 401;
            throw err;
          } else {
            user.password = await getHashPass(password);
          }
        }
        const updatedUser = await user.save();
        return res.status(200).json({
          data: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
          },
          status: "success",
          message: "User updated successfully",
        });
      } else {
        res.status(304).json({
          data: { _id: user._id, name: user.name, email: user.email },
          status: "success",
          message: "No changes to user profile",
        });
      }
    } else {
      const err = new Error("User not found");
      err.statusCode = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};
