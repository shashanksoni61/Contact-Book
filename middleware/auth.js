// Using this file/middleware to varify the token

const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  // 1. get the token from header
  const token = req.header('x-auth-token');

  // 2 . check if it exist or not
  if (!token) {
    return res.status(401).json({ msg: 'No Token ! Authorization Denied' });
  }

  // 3. now token exists so decode the token
  try {
    const decoded = jwt.verify(token, config.get('JWTSecret'));

    // now we've verified the token so we take the payload from token and assign it to Request Object

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};

module.exports = auth;
