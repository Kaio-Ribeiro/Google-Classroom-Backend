const knex = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const {
            name,
            email,
            password,
    
        } = request.body;
    
    
        const ids = await knex('users').insert({
            name,
            email,
            password,
            avatar: 'image-fake'
        })

        userID = ids[0];
    
        return response.json({ userID });
    }
}