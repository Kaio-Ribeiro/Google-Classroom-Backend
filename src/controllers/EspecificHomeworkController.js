const knex = require('../database/connection.js');

module.exports = {
    async index(request, response) {
        const {id} = request.params

        const contents = await knex('contents').where('content_type_id', 2).where('id', id).first()
        
        const user = await knex('users').where('id', contents.user_id).first()
        const homeworks = await knex('homeworks').where('content_id', contents.id).first()
        var dtLimit = homeworks.dateLimit.split('-')
        const attachments = await knex('content_attachments').where('content_id', contents.id).select(['id', 'path', 'type'])

        var splited = contents.created_at.split(' ')
        var date = splited[0].split('-')
        var time = splited[1].split(':')

        const infoHomeworks = {
            id: contents.id,
            homework_id: homeworks.id,
            title: contents.title,
            day: date[2],
            month: date[1],
            year: date[0],
            hours: time[0] + ':' + time[1],
            description: contents.description,
            user_name: user.name,
            dateLimit: homeworks.dateLimit,
            yearLimit: dtLimit[0],
            monthLimit: dtLimit[1],
            dayLimit: dtLimit[2],
            fullPoints: homeworks.fullPoints,
            attachments
            
        }

        return response.json(infoHomeworks)
    },

    async delete(request, response){
        const {id} = request.params
        const class_room_id = request.headers.authorization

        const trx = await knex.transaction();

        if(await trx('contents').where('id',id).where('class_room_id',class_room_id).delete()){
            await trx('homeworks').where('content_id',id).delete()
            await trx('content_attachments').where('content_id',id).delete()

            await trx.commit()
            return response.status(204).send()
        }else{
            return response.status(401).json({error: 'operation not permited'})
        }

    },

}