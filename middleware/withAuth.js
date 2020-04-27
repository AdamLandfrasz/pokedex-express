const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const withAuth = (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies["auth-token"];
  if (!token) return res.send("Access Denied");

  try {
    const verified = jwt.verify(req.cookies["auth-token"], process.env.SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = withAuth;
