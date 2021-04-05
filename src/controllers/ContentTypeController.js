const knex = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const {name} = request.body;

        const timestamp = Date.now();       
    
        await knex('content_types').insert({
            name,
            created_at: timestamp,
            updated_at: timestamp,
        })
    
        return response.json({success: true});
    },
}