const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const AuthController = require('../controllers/auth')

router.post('/signup', (req, res) => {
  AuthController.SignUp(req.body)
    .then(() => res.send('User created successfully'))
    .catch((err) => res.send(err.message))
})

router.post('/login', (req, res) => {
  AuthController.Login(req.body)
    .then(user => {
      if (!user) return res.status(404).send('No User')
      const token = jwt.sign(user.toJSON(), 'secret')
      res.send(token)
    })
})

module.exports = router