const jwt = require("jsonwebtoken");
const JWT_PASSWORD = "JwtPassword";

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_PASSWORD, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = decoded;
    // console.log("Req.user - " + JSON.stringify(req.user));
    next();
  });
};

module.exports = verifyToken;
