const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied!!" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer == !"Bearer" || !token) {
    return res.status(401).json({ message: "Access denied!! Invalid Format" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Access denied!! Invalid Token" });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
