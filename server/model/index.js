'use strict'
const fs = require('fs')
const Sequelize = require('sequelize')
const { default: Bug } = require('./Bug')
const { default: User } = require('./User')
const config = require('../util/DbCfg')

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.FILE_NAME,
  define: {
    timestamps: false,
  },
})

let db = {}
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    let keyName = file.split('.')[0].split('-')[0]
    keyName = keyName[0].toUpperCase() + keyName.slice(1, keyName.length)
    let moduleName = file.split('.')[0]
    db[keyName] = sequelize.import(moduleName)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Role.belongsToMany(db.User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})
db.User.belongsToMany(db.Role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

db.ROLES = ['ADMIN', 'MP', 'TST']

db.Project.hasMany(db.Bug)
db.Project.belongsToMany(db.User, { through: 'userProjects' })
db.User.belongsToMany(db.Project, { through: 'userProjects' })
db.User.hasMany(db.Bug)

module.exports = db
