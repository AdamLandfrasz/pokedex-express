const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/caught-pokemon", async (req, res) => {
  try {
    const defaultUser = await User.findOne({ name: "default" });
    if (defaultUser === null) {
      const newUser = new User({ name: "default", pokemonCaught: [] });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } else {
      res.json(defaultUser);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/caught-pokemon", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { name: "default" },
      { $set: { pokemonCaught: req.body.pokemonCaught } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
