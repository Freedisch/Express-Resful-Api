//const config = require("config");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { User } = require("../Models/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User doesn't exist");

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("email or password invalid");

  const token = jwt.sign(
    { _id: user._id },
    "Oi6LTsqOn7bPGoQuoCeGJo3g4/1n5n+2xxZfmjamQ/c="
  );
  res.send(token);
};

function validate(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}
