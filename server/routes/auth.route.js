const { Login, Signup } = require('../controller/auth.controller')

const router = require('express').Router()

router.post('/login', Login)

router.post('/signup', Signup)

module.exports = router
