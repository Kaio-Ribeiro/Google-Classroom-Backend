const knex = require('../database/connection.js');

module.exports = {
    
    async index(request,response) {
        const users = await knex('class_room_users').select('*')

        return response.json(users)
    },
    async delete(request,response){
        const {user_id} = request.params
        const class_room_id = request.headers.authorization
        

        if(await knex('class_room_users').where('user_id',user_id).where('class_room_id',class_room_id).delete()){
            return response.status(204).send()
        }else{
            return response.status(401).json({erro: 'operation not permited'})
        }

        
    }
}