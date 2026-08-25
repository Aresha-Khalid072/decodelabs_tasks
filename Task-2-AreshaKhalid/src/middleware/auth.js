

const API_KEY = process.env.API_KEY || "decodelabs-secret-key";

function authenticate(req, res, next) {
  const key = req.header("x-api-key");

  if (!key) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Missing API key. Provide it in the 'x-api-key' header."
    });
  }

  if (key !== API_KEY) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid API key."
    });
  }

  next();
}

module.exports = authenticate;