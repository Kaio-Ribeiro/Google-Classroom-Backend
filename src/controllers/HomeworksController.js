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

        const currentdate = new Date(); 
        const timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "+00";

        const trx = await knex.transaction();
        const user_id = request.headers.authorization
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
    },

    async index(request, response) {
        const class_id = request.headers.authorization 
        
        infoHomeworks = []

        const contents = await knex('contents').where('content_type_id', 2).where('class_room_id', class_id).select('*')
        
        for (var i = 0; i < contents.length; i++) {
            const user = await knex('users').where('id', contents[i].user_id).first()
            const homeworks = await knex('homeworks').where('content_id', contents[i].id).first()
            var dtLimit = homeworks.dateLimit.split('-')

            var splited = contents[i].created_at.split(' ')
            var date = splited[0].split('-')
            var time = splited[1].split(':')

            infoHomeworks.push({
                id: contents[i].id,
                title: contents[i].title,
                day: date[2],
                month: date[1],
                year: date[0],
                hours: time[0] + ':' + time[1],
                description: contents[i].description,
                user_name: user.name,
                yearLimit: dtLimit[0],
                monthLimit: dtLimit[1],
                dayLimit: dtLimit[2],
                fullPoints: homeworks.fullPoints,
                
            })
        }

        return response.json(infoHomeworks)
    },

    async delete(request, response){
        const {id} = request.params
        const class_room_id = request.headers.authorization


        if(await knex('contents').where('id',id).where('class_room_id',class_room_id).delete()){
            return response.status(204).send()
        }else{
            return response.status(401).json({error: 'operation not permited'})
        }

    }
}