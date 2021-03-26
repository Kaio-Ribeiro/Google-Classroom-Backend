const express = require('express')
const UserController = require('./controllers/UserController.js')
const ClassroomController = require('./controllers/ClassroomController.js')
const SessionController = require('./controllers/SessionController.js')

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.post('/users', UserController.create)
routes.get('/users', UserController.list)

routes.post('/classrooms', ClassroomController.create)
routes.get('/classrooms',ClassroomController.list)
routes.get('/classrooms/:id', ClassroomController.show)


module.exports = routes;