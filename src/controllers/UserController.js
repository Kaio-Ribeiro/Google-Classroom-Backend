const knex = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const {
            name,
            email,
            password,
            avatar,
    
        } = request.body;
    
    
        await knex('users').insert({
            name,
            email,
            password,
            avatar: 'image-fake'
        })
    
        return response.json({ success: true });
    }
}