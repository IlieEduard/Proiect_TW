const jwt = require('jsonwebtoken')
const config = require('../util/AuthCfg')
const db = require('../model')
const User = db.User

checkToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'Token has not been provided',
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

checkAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      })
      return
    })
  })
}

const authJwt = {
  checkToken: checkToken,
  checkAdmin: checkAdmin,
}

module.exports = authJwt
