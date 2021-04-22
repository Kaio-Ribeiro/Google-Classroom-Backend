const knex = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const { user_id, comment } = request.body;
        
        const content_id = request.headers.authorization

        const currentdate = new Date(); 
        const timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "+00";
        
        const ids = await knex('comments_contents').insert({
            user_id,
            content_id,
            comment,
            created_at: timestamp,
            updated_at: timestamp,
        })

        const commentID = ids[0]

        return response.json({ commentID })
    },

    async index(request, response) {
        const content_id = request.headers.authorization
        infoComments = []

        const comments = await knex('comments_contents').where('content_id', content_id).select('*')

        for (var i = 0; i < comments.length; i++) {
            const user = await knex('users').where('id', comments[i].user_id).first()
            var splited = comments[i].created_at.split(' ')
            var date = splited[0].split('-')
            var time = splited[1].split(':') 

            infoComments.push({
                id: comments[i].id,
                day: date[2],
                month: date[1],
                year: date[0],
                hours: time[0] + ':' + time[1],
                user_name: user.name,
                message: comments[i].comment,
            })
        }

        return response.json(infoComments)
    }
}