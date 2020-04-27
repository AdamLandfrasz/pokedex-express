const allowCrossOrigin = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://pokedex-master.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
};

module.exports = allowCrossOrigin;
