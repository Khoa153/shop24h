const express = require('express')
const routes = express.Router()
const authMiddleware = require('../Middleware/auth.middleware')
const authController = require('../Controllers/auth.controller')


//

routes.post('/signup', authMiddleware.checkduplicateUserName, authController.signup)

routes.post('/login', authController.login)

routes.post('/refreshToken' , authController.refreshToken)

module.exports = routes