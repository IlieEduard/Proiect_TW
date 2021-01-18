'use strict'
require('dotenv').config({ silent: true })
const express = require('express')
const bodyParser = require('body-parser')
const controllers = require('./controller')
const model = require('./model')
const fs = require('fs')
const cors = require('cors')
const Role = model.Role

const app = express()

let corsCfg = {
  origin: 'http://localhost:8081',
}
app.use(bodyParser.json())
app.use(express.static('static'))
app.use(cors(corsCfg))

console.log(controllers)

app.use('/project-api', controllers.ProjectController)
app.use('/bug-api', controllers.BugController)
app.use('/user-api', controllers.UserContoller)
app.use('/auth-api', controllers.AuthController)

function createDb() {
  model.sequelize
    .sync({ force: true })
    .then(() => {
      initRoles()
      console.log('created')
    })
    .catch((error) => console.log(error))
}

function initRoles() {
  Role.create({
    id: 1,
    name: 'ADMIN',
  })
  Role.create({
    id: 2,
    name: 'MP',
  })
  Role.create({
    id: 3,
    name: 'TST',
  })
}

if (!fs.existsSync('db1.sqlite')) {
  createDb()
}

app.listen(8080)
