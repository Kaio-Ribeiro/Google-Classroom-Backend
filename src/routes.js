import express from 'express';
import knex from './database/connection.js';

const routes = express.Router();

routes.post('/users', async (request, response) => {
    const {
        name,
        email,
        password,
        avatar

    } = request.body;

    try {
        await knex('users').insert({
            name,
            email,
            password,
            avatar: 'image-fake'
        })
    }catch (err) {
        console.log(knex)
    }

    return response.json({ success: true });

})

routes.get('/users', async (request, response) => {

    return console.log(knex('users'));

})

export default routes;