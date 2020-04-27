const allowCrossOrigin = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://pokedex-master.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Exposer-Headers", "Access-Control-Allow-Origin");
  next();
};

module.exports = allowCrossOrigin;
