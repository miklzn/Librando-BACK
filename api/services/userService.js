const e = require("express");
const { User } = require("../models");

exports.create = (user) => {
  return User.create(user);
};

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return false;
  const validate = await user.validatePassword(password);
  if (!validate) return false;
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    lastName: user.lastName,
  };
};

exports.change = (id, body) => {
  return User.findByPk(id).then((user) => user.update(body));
};
