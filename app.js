const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const allowCrossOrigin = require("./middleware/allowCrossOrigin");
const logger = require("./middleware/logger");

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
const authRoute = require("./routes/auth");

app.use(logger);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(allowCrossOrigin);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/pokedex/api/caught-pokemon", pokemonRoute);
app.use("/pokedex/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
