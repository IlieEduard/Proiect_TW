const db = require('../model')
const express = require('express')
const config = require('../util/AuthCfg')
const router = express.Router()
const User = db.User
const Role = db.Role

const Op = db.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const { verifySignUp } = require('../util')

function signUp(req, res) {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User registered!' })
          })
        })
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: 'User registered!' })
        })
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

function signIn(req, res) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Not found.' })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Password is invalid!',
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      })

      var authorities = []
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase())
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error ' + err.message })
    })
}

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  )
  next()
})

router.post('/api/auth/signup', [verifySignUp.validateUNameAndMail], signUp)

router.post('/api/auth/signin', signIn)

module.exports = router
