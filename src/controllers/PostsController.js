const knex = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const {
            description,
            classID,

        } = request.body;

        const user_id = request.headers.authorization

        //const timestamp = Date.now();

        const currentdate = new Date(); 
        const timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "+00";

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

    async index(request, response) {
        const class_id = request.headers.authorization 
        
        infoPosts = []

        const posts = await knex('contents').where('content_type_id', 1).where('class_room_id', class_id).select('*')
        
        for (var i = 0; i < posts.length; i++) {
            const user = await knex('users').where('id', posts[i].user_id).first()
            const attachments = await knex('content_attachments').where('content_id', posts[i].id).select(['id', 'url'])
            var splited = posts[i].created_at.split(' ')
            var date = splited[0].split('-')
            var time = splited[1].split(':')

            infoPosts.push({
                id: posts[i].id,
                title: posts[i].title,
                day: date[2],
                month: date[1],
                year: date[0],
                hours: time[0] + ':' + time[1],
                description: posts[i].description,
                created_at: posts[i].created_at,
                user_name: user.name,
                attachments
                
            })
        }

        return response.json(infoPosts)

    },

    async delete(request, response){
        const {id} = request.params
        const class_room_id = request.headers.authorization


        if(await knex('contents').where('id',id).where('class_room_id',class_room_id).delete()){
            return response.status(204).send()
        }else{
            return response.status(401).json({erro: 'operation not permited'})
        }

    }
}