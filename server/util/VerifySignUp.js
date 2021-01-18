const db = require('../model')
const ROLES = db.ROLES
const User = db.User

validateUNameAndMail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Username is already in use!',
      })
      return
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Email already in use!',
        })
        return
      }

      next()
    })
  })
}

const verifySignUp = {
  validateUNameAndMail: validateUNameAndMail,
}

module.exports = verifySignUp
