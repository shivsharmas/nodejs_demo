const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");
const User = require("../models/UserModels")

exports.verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

  //   const user = await User.findOne({ token: token });
  const user = await User.findOne({ token: token });
  //   const employee = await Employee.findOne({ token: token });

  if (
    // user ||
    user
    //  || employee
  ) {
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(644).send("Invalid Token");
    }
  } else {
    return res.status(644).send("Session time out");
  }

  return next();
};

exports.isSignedIn = expressJwt({
//   secret: process.env.JWT_SECRET,
  secret: 'HASRIGIAROGHAOIPRGHPIRGHIROEHGEIOPRUJASUIGPROGSDFGHFGF',
  algorithms: ["HS256"],
  userProperty: "auth",
});

// module.exports = verifyToken;
