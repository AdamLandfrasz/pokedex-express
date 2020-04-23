const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.username,
      password: hash,
      pokemonCaught: [],
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ msg: err.toString() });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwt.sign({ user }, process.env.SECRET);
      res.header("auth-token", token);
      res.json({ message: "OK", success: match, username: user.name });
    } else {
      res.json({ message: "FAILED", success: match, username: user.name });
    }
  } catch (err) {
    res.json({ message: "Invalid username or password!" });
  }
});

module.exports = router;
