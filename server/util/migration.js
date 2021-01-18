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

module.exports = createDb
