const knex = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const {
            userID,
            title,
            description,
            subject,
            avatar,
    
        } = request.body;

        const currentdate = new Date(); 
        const timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "+00";

        const trx = await knex.transaction();
        const class_code = crypto.randomBytes(4).toString('HEX')
        console.log(userID)
    
    
        const class_id = await trx('class_rooms').insert({
            code: class_code,
            title,
            description,
            subject,
            avatar,
            created_at: timestamp,
            updated_at: timestamp,
        })

        const class_users = {
            is_teacher: true,
            is_owner: true,
            user_id: userID,
            class_room_id: class_id[0],
            created_at: timestamp,
            updated_at: timestamp,
        }

        await trx('class_room_users').insert(class_users)

        await trx.commit()
        console.log(class_id[0])
    
        return response.json(class_id[0]);
    },

    async index(request,response) {
        const user_id = request.headers.authorization
        const class_room_users = await knex('class_room_users').where('user_id', user_id).select('*')
        var classrooms = [] 

        for (var i = 0; i < class_room_users.length; i++) {
            classrooms.push(await knex('class_rooms').where('id', class_room_users[i].class_room_id).first())
        }
        
        return response.json(classrooms)
    },
}