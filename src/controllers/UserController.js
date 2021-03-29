const knex = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const {
            name,
            email,
            password,
            confirmedPassword
    
        } = request.body;

        if(confirmedPassword != password) {
            return response.status(400).json({ error: 'Invalid password.'})
        }

        const timestamp = Date.now();
        const ids = await knex('users').insert({
            name,
            email,
            password,
            created_at: timestamp,
            updated_at: timestamp,
        })

        const userID = ids[0];
    
        return response.json({ userID });
    },
    async index(request,response) {
        const users = await knex('users').select('*')

        return response.json(users)
    }
}