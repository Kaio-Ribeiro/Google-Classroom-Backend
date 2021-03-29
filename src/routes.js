const express = require('express')
const UserController = require('./controllers/UserController.js')
const ClassroomController = require('./controllers/ClassroomController.js')
const SessionController = require('./controllers/SessionController.js')
const InvitedTeacherController = require('./controllers/InvitedTeacherController.js')
const InvitedStudentController = require('./controllers/InvitedStudentController.js')

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.post('/users', UserController.create)
routes.get('/users', UserController.index)

routes.post('/classrooms', ClassroomController.create)
routes.get('/classrooms',ClassroomController.index)

routes.post('/teachers', InvitedTeacherController.create)
routes.get('/teachers', InvitedTeacherController.index)

routes.post('/students', InvitedStudentController.create)
routes.get('/students', InvitedStudentController.index)

module.exports = routes;