const express = require('express')
const multer = require('multer')
const UserController = require('./controllers/UserController.js')
const ClassroomController = require('./controllers/ClassroomController.js')
const SessionController = require('./controllers/SessionController.js')
const InvitedTeacherController = require('./controllers/InvitedTeacherController.js')
const InvitedStudentController = require('./controllers/InvitedStudentController.js')
const ClassroomUsersController = require('./controllers/ClassroomUsersController.js')
const PostsController = require('./controllers/PostsController.js')
const MaterialsController = require('./controllers/MaterialsController.js')
const ContentTypeController = require('./controllers/ContentTypeController.js')
const sendEmailController = require('./controllers/sendEmailController.js')
const HomeworksController = require('./controllers/HomeworksController.js')
const ResponsesController = require('./controllers/ResponsesController.js')
const CommentsController = require('./controllers/CommentsController.js')

const uploadConfig = require('./config/upload')
const { request } = require('express')


const routes = express.Router();
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.create)

routes.post('/users', UserController.create)
routes.get('/users', UserController.index)
//routes.delete('users/:id',UserController.delete)

routes.post('/classrooms', ClassroomController.create)
routes.get('/classrooms',ClassroomController.index)

routes.post('/teachers', InvitedTeacherController.create)
routes.put('/teachers', InvitedTeacherController.update)
routes.get('/teachers', InvitedTeacherController.index)

routes.post('/students', InvitedStudentController.create)
routes.get('/students', InvitedStudentController.index)

routes.get('/classroomsusers',ClassroomUsersController.index)
routes.delete('/classroomsusers/:user_id',ClassroomUsersController.delete)

routes.post('/posts', upload.array('files'), PostsController.create)
routes.get('/posts', PostsController.index)
routes.delete('/posts/:id',PostsController.delete)
routes.put('/posts/:id', upload.array('files'), PostsController.update)

routes.get('/materials', MaterialsController.index)
routes.post('/materials', upload.array('files'), MaterialsController.create)
routes.delete('/materials/:id', MaterialsController.delete)
routes.put('/materials/:id', upload.array('files'), MaterialsController.update)

routes.post('/content-types', ContentTypeController.create)

routes.post('/send-email',sendEmailController.create)

routes.post('/homeworks', upload.array('files'),HomeworksController.create)
routes.get('/homeworks', HomeworksController.index)
routes.delete('/homeworks/:id', HomeworksController.delete)
routes.put('/homeworks/:id', upload.array('files'), HomeworksController.update)

routes.post('/responses', upload.array('files'),ResponsesController.create)
routes.get('/responses', ResponsesController.index)
routes.put('/responses/:id', ResponsesController.update)

routes.post('/comment-post', CommentsController.create)
routes.get('/comment-post', CommentsController.index)

module.exports = routes;