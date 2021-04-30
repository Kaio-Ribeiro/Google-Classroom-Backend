const knex = require('../database/connection.js');

module.exports = {
    async delete(request, response){
        const {id} = request.params

        if(await knex('content_attachments').where('id',id).delete()){
            return response.status(204).send()
        }else{
            return response.status(401).json({erro: 'operation not permited'})
        }

    },

    
}