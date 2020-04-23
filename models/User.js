const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  pokemonCaught: Array,
});

module.exports = mongoose.model("User", UserSchema);
