const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./middleware/logger");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`mongoDB connected at ${process.env.DB_CONNECTION}`);
  }
);

const pokemonRoute = require("./routes/caughtPokemon");

app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use("/pokedex/api", pokemonRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
