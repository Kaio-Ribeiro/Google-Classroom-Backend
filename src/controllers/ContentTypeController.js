const knex = require('../database/connection.js');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const {name} = request.body;

        const currentdate = new Date(); 
        const timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "+00";    
    
        await knex('content_types').insert({
            name,
            created_at: timestamp,
            updated_at: timestamp,
        })
    
        return response.json({success: true});
    },
}