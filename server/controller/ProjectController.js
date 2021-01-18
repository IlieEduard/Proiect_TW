'use strict'
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../model')

const Op = Sequelize.Op

router.post('/project', async (req, res) => {
  try {
    await models.Project.create(req.body)
    res.status(201).json({
      message: 'created',
      result: req.body,
    })
  } catch (error) {
    console.warn(error.stack)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/project', async (req, res) => {
  try {
    let projects
    projects = await models.Project.findAll()

    res.status(200).json(projects)
  } catch (error) {
    console.warn(error.stack)
    res.status(500).json({ message: 'server error' })
  }
})

router.post('/project/:id/addUser/:userId', async (req, res) => {
  try {
    let project = await models.Project.findByPk(req.params.id)
    if (project) {
      let user = await models.User.findByPk(req.params.userId)
      if (user) {
        project.addUser(user)
        res.status(201).json({ message: 'successfully added user' })
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.post('/project/:id/removeUser/:userId', async (req, res) => {
  try {
    let project = await models.Project.findByPk(req.params.id)
    if (project) {
      let user = await models.User.findByPk(req.params.userId)
      if (user) {
        await project.removeUser(user)
        res.status(201).json({ message: 'successfully removed user' })
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/project/:id/users/', async (req, res) => {
  try {
    let users = await models.sequelize.query(
      `SELECT u.id, u.username FROM userProjects up
            JOIN users u ON u.id = up.userId
            WHERE projectId = ${req.params.id}`,
      {
        model: models.User,
        mapToModel: true,
      },
    )

    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404).json({ message: 'Not found project' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/project/:id', async (req, res) => {
  try {
    let project = await models.Project.findByPk(req.params.id)
    if (project) {
      res.status(200).json(project)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.put('/project/:id', async (req, res) => {
  try {
    let project = await models.Project.findByPk(req.params.id)
    if (project) {
      await project.update(req.body)
      res.status(202).json({ message: 'successful', result: project })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

router.delete('/project/:id', async (req, res) => {
  try {
    let project = await models.Project.findByPk(req.params.id)
    if (project) {
      await project.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

module.exports = router
