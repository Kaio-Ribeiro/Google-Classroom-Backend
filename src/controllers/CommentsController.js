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
        const content_id = request.headers.autorization

        const comments = await knex('comments_contents').where('content_id', content_id).select('*')

        return response.json(comments)
    }
}