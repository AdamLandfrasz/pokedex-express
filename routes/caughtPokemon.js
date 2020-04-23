const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  console.log(req.headers);
  console.log(req.cookies);

  try {
    const defaultUser = await User.findOne({ name: req.query.user });
    res.json(defaultUser);
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { name: req.query.user },
      { $set: { pokemonCaught: req.body.pokemonCaught } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err.toString() });
  }
});

module.exports = router;
