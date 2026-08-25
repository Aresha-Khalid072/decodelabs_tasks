

let users = [
  { id: 1, firstName: "Ada", lastName: "Lovelace", email: "ada@example.com", role: "admin" },
  { id: 2, firstName: "Alan", lastName: "Turing", email: "alan@example.com", role: "user" }
];

let nextId = 3;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((u) => u.id === id);
}

function create(data) {
  const newUser = { id: nextId++, ...data };
  users.push(newUser);
  return newUser;
}

function update(id, data) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data, id };
  return users[index];
}

function remove(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };