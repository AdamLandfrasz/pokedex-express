const allowCrossOrigin = (req, res, next) => {
  console.log(req.getHeaders());

  res.header(
    "Access-Control-Allow-Origin",
    "https://pokedex-master.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept, X-PINGOTHER"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
};

module.exports = allowCrossOrigin;
