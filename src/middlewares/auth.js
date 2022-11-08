const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied not token provided");

  try {
    const decoded = jwt.verify(
      token,
      "Oi6LTsqOn7bPGoQuoCeGJo3g4/1n5n+2xxZfmjamQ/c="
    );
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
