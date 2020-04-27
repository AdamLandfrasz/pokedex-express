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
  res.header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
  next();
};

module.exports = allowCrossOrigin;
