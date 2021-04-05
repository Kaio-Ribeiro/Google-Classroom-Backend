const knex = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const {
            description,
            classID,

        } = request.body;

        const user_id = request.headers.authorization

        const timestamp = Date.now();       
    
        await knex('contents').insert({
            user_id,
            title: 'Postagem',
            description,
            class_room_id: classID,
            content_type_id: 1,
            created_at: timestamp,
            updated_at: timestamp,
        })
    
        return response.json({success: true});
    },
}