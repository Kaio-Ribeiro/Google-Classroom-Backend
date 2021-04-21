const knex = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const {
            user_id,
            deliveryDate,
            note,

        } = request.body;

        const currentdate = new Date(); 
        const timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "+00";

        const homework_id = request.headers.authorization
        const requestFiles = request.files

        const files = requestFiles.map(file => {
            return { url: file.filename, mimetype: file.mimetype }
        })
        
        const contentID = await knex('homework_responses').insert({
            user_id,
            deliveryDate,
            homework_id,
            note,
            created_at: timestamp,
            updated_at: timestamp,
        })

        if (files.length === 0) { 
            return response.status(201).json({success: true});
        }else {
            for (var i = 0; i < files.length; i++) {
                mimetype = files[i].mimetype.split('/')
                type = mimetype[0]
                extension = mimetype[1]
                await knex('response_attachments').insert({
                    homework_response_id: homework_id,
                    path: files[i].url,
                    extension,
                    type,
                    created_at: timestamp,
                    updated_at: timestamp,
                })
            }

            return response.status(201).json({success: true});
        }
    },

    async index(request, response) {
        const homework_id = request.headers.authorization
        infoResponses = []

        const responses = await knex('homework_responses').where('homework_id', homework_id).select('*')
        
        for (var i = 0; i < responses.length; i++) {
            const users = await knex('users').where('id', responses[i].user_id).first()
            const homework = await knex('homeworks').where('id', responses[i].homework_id).first()
            const content = await knex('contents').where('id', homework.content_id).first()
            const attachments = await knex('response_attachments').where('homework_response_id', responses[i].id).select(['id', 'path'])
            var dtLimit = responses[i].deliveryDate.split('-')

            var splited = responses[i].created_at.split(' ')
            var date = splited[0].split('-')
            var time = splited[1].split(':')

            infoResponses.push({
                id: responses[i].id,
                name: users.name,
                title: content.title,
                description: content.description,
                note: responses[i].note,
                day: date[2],
                month: date[1],
                year: date[0],
                hours: time[0] + ':' + time[1],
                yearLimit: dtLimit[0],
                monthLimit: dtLimit[1],
                dayLimit: dtLimit[2],
                attachments
                
            })
        }

        return response.json(infoResponses)

    },

    async update(request, response) {
        const {
            note,

        } = request.body;

        const currentdate = new Date(); 
        const timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "+00";

        const {id} = request.params
        
        await knex('homework_responses').where('id', id).update({
            note,
            updated_at: timestamp,
        })

        return response.status(201).json({success: true});
    },
}