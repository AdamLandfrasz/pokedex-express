const moment = require("moment");
const logger = (req, res, next) => {
  console.log(
    `${req.method} | ${req.protocol}://${req.get("host")}${
      req.url
    } | ${moment().format("L LTS")}`
  );
  next();
};

module.exports = logger;
