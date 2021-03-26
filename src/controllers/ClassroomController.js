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

        const trx = await knex.transaction();
        const class_id = crypto.randomBytes(4).toString('HEX')
        console.log(userID)
    
    
        await trx('classrooms').insert({
            id: class_id,
            title,
            description,
            subject,
            avatar
        })

        const user_has_class = {
            is_teacher: true,
            is_owner: true,
            user_id: userID,
            classroom_id: class_id,
        }

        await trx('user_has_class').insert(user_has_class)

        await trx.commit()
    
        return response.json({ class_id });
    },

    async list(request,response) {
        const user_id = request.headers.authorization
        const user_has_class = await knex('user_has_class').where('user_id', user_id).select('*')
        var classrooms = []

        for (var i = 0; i < user_has_class.length; i++) {
            classrooms.push(await knex('classrooms').where('id', user_has_class[i].classroom_id).first())
        }
        
        return response.json(classrooms)
    }
}