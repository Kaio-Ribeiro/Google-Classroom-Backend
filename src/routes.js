import express from 'express';
import knex from './database/connection.js';
import UserController from './controllers/UserController.js'

const routes = express.Router();

routes.post('/users', UserController.create)


export default routes;