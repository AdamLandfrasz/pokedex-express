const express = require("express");
const router = express.Router();
const withAuth = require("../middleware/withAuth");
const User = require("../models/User");

router.get("/", withAuth, async (req, res) => {
  try {
    const defaultUser = await User.findOne({ name: req.user.name });
    res.json(defaultUser);
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

router.put("/", withAuth, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { name: req.user.name },
      { $set: { pokemonCaught: req.body.pokemonCaught } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

module.exports = router;
