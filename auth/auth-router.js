const router = require('express').Router();

const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../helpers.js');
const { jwtSecret } = require('./secrets');



router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(user.password, 8)
  user.password = hash;

  Users.add(user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({
      error: "test",
      err
    })
  })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
  Users.findBy({ username })
  .first()
  .then(item => {
    if (item && bc.compareSync(password, item.password)) {
      const token = signToken(user)
      res.status(200).json({
        token
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      err
    })
  })
});

function signToken(user){
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
