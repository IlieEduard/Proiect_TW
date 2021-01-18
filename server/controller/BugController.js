'use strict'
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../model')

const Op = Sequelize.Op

router.post('/bug', async (req, res) => {
  try {
    await models.Bug.create(req.body)
    res.status(201).json({
      message: 'created',
      result: req.body,
    })
  } catch (error) {
    console.warn(error.stack)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/bug', async (req, res) => {
  try {
    let bug = await models.Bug.findAll()

    res.status(200).json(bug)
  } catch (error) {
    console.warn(error.stack)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/bug/:id', async (req, res) => {
  try {
    let bug = await models.Bug.findByPk(req.params.id)
    if (bug) {
      res.status(200).json(bug)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.get('/bug/project/:projectId', async (req, res) => {
  try {
    let bugs = await models.Bug.findAll({
      where: {
        projectId: req.params.projectId,
      },
    })
    if (bugs) {
      res.status(200).json(bugs)
    } else {
      res.status(404).json({ message: 'no bugs for this project' })
    }
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.put('/bug/:id', async (req, res) => {
  try {
    let bug = await models.Bug.findByPk(req.params.id)
    if (bug) {
      console.log(bug)
      await bug.update(req.body)
      res.status(202).json({ message: 'successful', result: bug })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

router.delete('/bug/:id', async (req, res) => {
  try {
    let bug = await models.Bug.findByPk(req.params.id)
    if (bug) {
      await bug.destroy()
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
