const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username },
    "Oi6LTsqOn7bPGoQuoCeGJo3g4/1n5n+2xxZfmjamQ/c="
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).send("User not authenticated");
  }
};

module.exports = { createTokens };
