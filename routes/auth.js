const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const withAuth = require("../middleware/withAuth");
const User = require("../models/User");
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    if (user) {
      res.json({ message: "This username is already in use!", success: false });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: req.body.username,
        password: hash,
        pokemonCaught: [],
      });
      const savedUser = await newUser.save();
      res.json({ savedUser, message: "OK", success: true });
    }
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwt.sign({ user }, process.env.SECRET);
      res
        .cookie("auth-token", token, {
          httpOnly: true,
        })
        .json({ message: "OK", success: match, username: user.name });
    } else {
      res.json({ message: "Invalid username or password!" });
    }
  } catch (err) {
    res.json({ message: "Invalid username or password!" });
  }
});

router.get("/logout", withAuth, async (req, res) => {
  res
    .clearCookie("auth-token")
    .status(200)
    .json({ message: "User Logged Out", success: true });
});

router.get("/validate", withAuth, async (req, res) => {
  res.status(200).json({ username: req.user.name });
});

module.exports = router;
