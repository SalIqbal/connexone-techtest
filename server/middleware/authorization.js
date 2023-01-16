const { KEY } = require("../config");
const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization !== KEY) {
    if (res) {
      return res.status(403).send("Unauthorised Request");
    } else {
      return false;
    }
  }
  if (next) {
    next();
  } else {
    return true;
  }
};
module.exports = { authenticate };
