const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    // req.isAuth = false;

    // for test model
    const error = new Error("Not Authenticated.");
    error.statusCode = 401;
    throw error;
    // return next();
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecret");
  } catch (err) {
    // for test model
    err.statusCode = 500;
    throw err;
    // req.isAuth = false;
    // return next();
  }
  if (!decodedToken) {
    // for test model
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
    // req.isAuth = false;
    // return next();
  }
  req.userId = decodedToken.userId;
  // req.isAuth = true;
  next();
};
