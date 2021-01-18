'use strict'
const express = require('express')
const router = express.Router()
const { checkAdmin, checkToken } = require('../util')
const db = require('../model')

router.get('/user/:id/projects/', async (req, res) => {
  try {
    let projects = await db.sequelize.query(
      `SELECT p.id, p.name, p.description, p.repository FROM userProjects up
            JOIN projects p ON p.id = up.projectId
            WHERE userId = ${req.params.id}`,
      {
        model: db.Project,
        mapToModel: true,
      },
    )

    if (projects) {
      res.status(200).json(projects)
    } else {
      res.status(404).json({ message: 'Not found project' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/user/:userId', async (req, res) => {
  try {
    let user = await db.User.findByPk(req.params.userId)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  )
  next()
})

module.exports = router
