import jwt from "jsonwebtoken";

export const genToken = async (res, userId) => {
  // generating token
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // setting cookie
  res.cookie("jwt", token, {
    httpOnly: true, // for xss protection
    secure: process.env.NODE_ENV !== "development", // https access only
    sameSite: "strict", // for csrf protection
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
};
