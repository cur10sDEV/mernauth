import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        next();
      } catch (error) {
        const err = new Error("Not authorized, invalid token");
        err.statusCode = 401;
        throw err;
      }
    } else {
      const err = new Error("Not authorized, no token");
      err.statusCode = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};
