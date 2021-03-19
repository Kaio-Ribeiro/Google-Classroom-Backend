import express from 'express';
import knex from './database/connection.js';
import UserController from './controllers/UserController.js'
import ClassroomController from './controllers/ClassroomController.js'

const routes = express.Router();

routes.post('/users', UserController.create)

routes.post('/classrooms', ClassroomController.create)


export default routes;