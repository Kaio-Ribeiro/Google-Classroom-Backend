const knex = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const {
            userID,
            class_code
    
        } = request.body;

        const trx = await knex.transaction();
        const timestamp = Date.now();
    
        const class_room = await trx('class_rooms').where('code', class_code).first()

        const class_users = {
            is_teacher: true,
            is_owner: false,
            user_id: userID,
            class_room_id: class_room.id,
            created_at: timestamp,
            updated_at: timestamp,
        }

        await trx('class_room_users').insert(class_users)

        await trx.commit()
    
        return response.json(class_room.id);
    },

    async index(request,response) {
        const class_id = request.headers.authorization
        const class_room_users = await knex('class_room_users').where('class_room_id', class_id).where('is_owner', 0).select('*')
        var classrooms = []

        for (var i = 0; i < class_room_users.length; i++) {
            classrooms.push(await knex('users').where('id', class_room_users[i].user_id).first())
        }
        
        return response.json(classrooms)
    },
}