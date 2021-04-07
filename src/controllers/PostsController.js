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

        const requestFiles = request.files


        const files = requestFiles.map(file => {
            return { url: file.filename }
        })
    
        const contentID = await knex('contents').insert({
            user_id,
            title: 'Postagem',
            description,
            class_room_id: classID,
            content_type_id: 1,
            created_at: timestamp,
            updated_at: timestamp,
        })

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
        
    },
}