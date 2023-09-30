import { validationResult } from "express-validator";

const checker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.statusCode = 422;
    throw err;
  }
  return;
};

export default checker;
