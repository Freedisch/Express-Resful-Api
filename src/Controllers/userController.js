const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, validateUser } = require("../Models/user");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already exist");

  const password = await bcrypt.hash(req.body.password, 10);
  if (!password) return res.status(400).send("Password not hash");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
  });
  await user.save();

  const token = jwt.sign(
    { _id: user._id },
    "Oi6LTsqOn7bPGoQuoCeGJo3g4/1n5n+2xxZfmjamQ/c="
  );
  res.header("x-auth-token", token).send(user);
};
