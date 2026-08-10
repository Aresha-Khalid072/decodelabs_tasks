const usersDB = require("../data/users");

// GET /users - Retrieve all users
function getUsers(req, res) {
  res.status(200).json({
    count: usersDB.getAll().length,
    data: usersDB.getAll()
  });
}

// GET /users/:id - Retrieve a single user
function getUserById(req, res) {
  const user = usersDB.getById(req.params.id);
  if (!user) {
    return res.status(404).json({
      error: "Not Found",
      message: `User with id ${req.params.id} does not exist.`
    });
  }
  res.status(200).json({ data: user });
}

// GET /users/:id/first-name
function getUserFirstName(req, res) {
  const user = usersDB.getById(req.params.id);
  if (!user) {
    return res.status(404).json({
      error: "Not Found",
      message: `User with id ${req.params.id} does not exist.`
    });
  }
  res.status(200).json({ firstName: user.firstName });
}

// POST /users - Create a new user
function createUser(req, res) {
  const { firstName, lastName, email, role = "user" } = req.body;
  const newUser = usersDB.create({ firstName, lastName, email, role });
  res.status(201).json({
    message: "User created successfully.",
    data: newUser
  });
}

// PUT /users/:id - Update an existing user
function updateUser(req, res) {
  const updated = usersDB.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({
      error: "Not Found",
      message: `User with id ${req.params.id} does not exist.`
    });
  }
  res.status(200).json({
    message: "User updated successfully.",
    data: updated
  });
}

// DELETE /users/:id - Remove a user
function deleteUser(req, res) {
  const deleted = usersDB.remove(req.params.id);
  if (!deleted) {
    return res.status(404).json({
      error: "Not Found",
      message: `User with id ${req.params.id} does not exist.`
    });
  }
  res.status(204).send();
}

module.exports = {
  getUsers,
  getUserById,
  getUserFirstName,
  createUser,
  updateUser,
  deleteUser
};