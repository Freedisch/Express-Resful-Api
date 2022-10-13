const mongoose = require("mongoose");
const joi = require("Joi");
const Joi = require("Joi");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },

  //   email: {
  //     type: String,
  //     required: true,
  //     minlength: 3,
  //     maxlength: 25,
  //     unique: true,
  //   },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    //email: Joi.string().min(3).max(25).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
