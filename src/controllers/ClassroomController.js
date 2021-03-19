import knex from '../database/connection.js';

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
    
    
        const ids = await trx('classrooms').insert({
            title,
            description,
            subject,
            avatar: 'image-fake'
        })

        const user_has_class = {
            is_teacher: true,
            is_owner: true,
            user_id: user_id,
            classroom_id: ids,
        }

        await trx('user_has_class').insert(user_has_class)

        await trx.commit()
    
        return response.json({ success: true });
    }
}