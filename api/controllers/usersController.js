const userService = require("../services/userService");

exports.createUser = (req, res) => {
  const user = req.body;
  userService
    .create(user)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => res.status(400).send(err));
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const payload = await userService.login(email, password);
  if (!payload) res.sendStatus(401);
  const token = generateToken(payload);
  res.cookie("token", token);
  res.send(payload);
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

exports.editUser = (req, res) => {
  const id = req.params.id;
  userService.change(id, req.body).then((updatedUser) => res.send(updatedUser));
};

// exports.removeUser = (req, res) => {
//   const id = req.params.id;
//   userService.delete();
// };
