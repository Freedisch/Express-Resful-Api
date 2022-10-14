const config = require("config");
const mongoose = require("mongoose");
const { User } = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userLogin = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User doesn't exist");

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("email or password invalid");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
};

function validate(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}
