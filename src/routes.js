const express = require('express')
const UserController = require('./controllers/UserController.js')
const ClassroomController = require('./controllers/ClassroomController.js')
const SessionController = require('./controllers/SessionController.js')

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.post('/users', UserController.create)

routes.post('/classrooms', ClassroomController.create)


module.exports = routes;