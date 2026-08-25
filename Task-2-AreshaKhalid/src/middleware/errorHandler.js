
function notFoundHandler(req, res) {
  res.status(404).json({
    error: "Not Found",
    message: `The route ${req.method} ${req.originalUrl} does not exist.`
  });
}

function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on our end."
  });
}

module.exports = { notFoundHandler, errorHandler };