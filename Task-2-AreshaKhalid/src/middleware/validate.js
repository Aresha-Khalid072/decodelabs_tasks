


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROLES = ["admin", "user"];

function validateUserPayload(req, res, next) {
  const { firstName, lastName, email, role } = req.body;
  const errors = [];

  // Syntactic validation
  if (!firstName || typeof firstName !== "string" || firstName.trim() === "") {
    errors.push("firstName is required and must be a non-empty string.");
  }
  if (!lastName || typeof lastName !== "string" || lastName.trim() === "") {
    errors.push("lastName is required and must be a non-empty string.");
  }
  if (!email || typeof email !== "string") {
    errors.push("email is required and must be a string.");
  } else if (!EMAIL_REGEX.test(email)) {
    // Semantic validation
    errors.push("email must be a valid email address.");
  }
  if (role && !ALLOWED_ROLES.includes(role)) {
    errors.push(`role must be one of: ${ALLOWED_ROLES.join(", ")}.`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Validation failed.",
      details: errors
    });
  }

  next();
}


function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "id must be a positive integer."
    });
  }
  req.params.id = id;
  next();
}

module.exports = { validateUserPayload, validateIdParam };