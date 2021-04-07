const knex = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const {
            title,
            description,
            fullPoints,
            dateLimit,
            classID,

        } = request.body;

        const trx = await knex.transaction();
        const user_id = request.headers.authorization
        const timestamp = Date.now();
        const requestFiles = request.files

        

        const files = requestFiles.map(file => {
            return { url: file.filename }
        })

        
        const contentID = await trx('contents').insert({
            user_id,
            title,
            description,
            class_room_id: classID,
            content_type_id: 2,
            created_at: timestamp,
            updated_at: timestamp,
        })

        const homeworksID = await trx('homeworks').insert({
            content_id:contentID[0],
            fullPoints,
            dateLimit,
            created_at: timestamp,
            updated_at: timestamp,
        })

        
        await trx.commit()
        if (files.length === 0) { 
            return response.status(201).json({success: true});
        }else {
            for (var i = 0; i < files.length; i++) {
                await knex('content_attachments').insert({
                    content_id: contentID[0],
                    url: files[i].url,
                    created_at: timestamp,
                    updated_at: timestamp,
                })
            }

            return response.status(201).json({success: true});
        }
    }
}