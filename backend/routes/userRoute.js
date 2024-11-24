const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router.post('/user/register', userController.Register)
router.post('/user/login', userController.Login)
router.get('/user/logout', userController.Logout)
router.get('/user/loggedIn', userController.LoggedIn)
router.get('/user', userController.showAllUsers)
router.get('/user/:id', userController.showOnlyOneUser)
router.put('/user/:id', userController.editUser)

module.exports = router