/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets.js')


module.exports = (req, res, next, error) => {
  const token = req.headers.authorization
  
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (error) {
        res.status(401).json({
          token: "is not valid",
        })
      } else {
        next();
      }
    })
  } else if (error) {
    res.status(401).json({
      token: "you shall not pass!",
    })
  } else {
    next()
  }
};
