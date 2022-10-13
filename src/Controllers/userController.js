const { User, validateUser } = require("../Models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  let user = await User.findOne({ username: username });
  if (user) return res.status(400).send("user already exist");

  bcrypt.hash(password, 10).then((hash) => {
    user = new User({
      username: username,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.send(user);
      })
      .catch((err) => {
        if (err) {
          res.status(400).send({ error: err });
        }
      });
  });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username: username });
  if (!user) return res.status(400).send({ error: " user doesn't exist" });

  const dbpassword = user.password;
  bcrypt.compare(password, dbpassword).then((match) => {
    if (!match) {
      res.status(400).send({ error: "Password incorrect" });
    } else {
      res.send("LOG IN");
    }
  });
};
