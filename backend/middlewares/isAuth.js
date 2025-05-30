const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    // const authorizationHeader = req.get("Authorization");
    // if (!authorizationHeader) {
    //   return res.status(401).json({ message: "Authorization not found" });
    // }

    // Get the token
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ message: "Token invalid or not found" });
    }

    // Verify token with jwt
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach the decoded token data to the request object

    next();
  } catch (err) {
    console.error("Authorization error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuth;
