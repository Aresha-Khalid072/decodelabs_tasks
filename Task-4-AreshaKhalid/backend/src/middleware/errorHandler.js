import ApiError from "../utils/ApiError.js";


function errorHandler(error, req, res, next) {
  const isKnownError = error instanceof ApiError;
  const statusCode = isKnownError ? error.statusCode : 500;

  
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${statusCode}:`,
    error.message
  );

  res.status(statusCode).json({
    error: isKnownError ? error.message : "Something went wrong on our end. Please try again.",
  });
}

export default errorHandler;