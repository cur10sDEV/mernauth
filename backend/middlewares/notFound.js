const notFound = (req, res, next) => {
  const err = new Error(`Could not found *${req.originalUrl}* on the server`);
  err.statusCode = 404;
  next(err);
};

export default notFound;
