import express from 'express';
import knex from './database/connection.js';

const routes = express.Router();

routes.post('/users', async (request, response) => {
    const {
        name,
        email,
        password,
        avatar,

    } = request.body;

    try {
        await knex('users').insert({
            name,
            email,
            password,
            avatar
        })
    }catch (err) {
        console.log(err)
    }

    return response.json({ success: true });

})


export default routes;