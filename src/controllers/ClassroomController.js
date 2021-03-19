import knex from '../database/connection.js';
import crypto from 'crypto';

export default {
    async create(request, response) {
        const {
            user_id,
            title,
            description,
            subject,
            avatar,
    
        } = request.body;

        const trx = await knex.transaction();
        const class_id = crypto.randomBytes(4).toString('HEX')
    
    
        await trx('classrooms').insert({
            id: class_id,
            title,
            description,
            subject,
            avatar: 'image-fake'
        })

        const user_has_class = {
            is_teacher: true,
            is_owner: true,
            user_id: user_id,
            classroom_id: class_id,
        }

        await trx('user_has_class').insert(user_has_class)

        await trx.commit()
    
        return response.json({ class_id });
    }
}