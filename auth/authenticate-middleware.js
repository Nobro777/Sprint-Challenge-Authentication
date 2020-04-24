/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/




const jwt = require('jsonwebtoken');
const jwtSecret = require('./secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: 'your token is incorrect missing or invalid' })
      } else {
        req.user = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ message: 'you need a token to continue' })
  }
};